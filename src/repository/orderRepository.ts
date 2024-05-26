import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";
import { Repository } from "./repository";
import { CreateOrderModel, OrderStatusModel, OrderWithLines, OrderlinesModel } from "../models/createOrderModel";
import { Order } from "../models/order";
import { OrderLines } from "../models/orderLines";
import { tables } from "../db/drizzle";
import { eq, inArray } from "drizzle-orm";
import { QueryBuilder, int } from "drizzle-orm/sqlite-core";


export class OrderRepository extends Repository {
  db: DrizzleD1Database<Record<string, never>>;
  d1: D1Database;
  setDb(db: D1Database) {
    this.d1 = db;
    this.db = drizzle(db);
    return this;
  }
  async CreateOrder(order: Partial<CreateOrderModel>): Promise<Order> {
    debugger;
    const orderStatus = "New";
    let _order: Order = {
      orderId: null,
      status: orderStatus,
      locationId: order.locationId,
      totalAmount: 0,
      customerId: null,
    };

    try {
      const createOrderQuery = `INSERT INTO Orders (locationId,status)
                                 VALUES(?,?)`;
      const createdOrder = await this.d1
        .prepare(createOrderQuery)
        .bind(order.locationId, orderStatus)
        .run();
      if (createdOrder.success) {
        let orderId: string = createdOrder.meta.last_row_id
          .toString()
          .padStart(7, "0"); // converting to string as a 7 char value
        _order.orderId = orderId;
        console.log(orderId);
        const OrderIdUpdateQuery = `UPDATE Orders SET orderId=?`;
        await this.d1.prepare(OrderIdUpdateQuery).bind(orderId).run();
        let orderLinesPrepared: OrderLines[] = await this.getOrderLinesPrepared(
          orderId,
          orderStatus,
          order
        );
        await this.db.insert(tables.orderLines).values(orderLinesPrepared);
      }
    } catch (err) {
      debugger;
      console.log(err);
    }
    return await _order;
  }

  async OrderStatusUpdate(orderStatus: OrderStatusModel): Promise<boolean> {
    const orderLineStatusUpdateQuery = `UPDATE orderlines SET STATUS=? WHERE id=?`;
    const orderStatusUpdateQuery = `UPDATE orders SET STATUS=? WHERE id=?`;
    const query = orderStatus.isLineUpdate
      ? orderLineStatusUpdateQuery
      : orderStatusUpdateQuery;
    const result = await this.d1
      .prepare(query)
      .bind(orderStatus.status, orderStatus.Id)
      .run();
    return result.success;
  }
  async GetOrderWithLines(OrderId: string): Promise<OrderWithLines> {
    const getOrderQuery = "SELECT * FROM orders WHERE orderId=?";
    const getOrderLinesQuery = "SELECT * FROM orderlines WHERE orderId=?";

    const order = await this.d1.prepare(getOrderQuery).bind(OrderId).first() as Partial<Order>;   
    const ol = await this.d1.prepare(getOrderLinesQuery).bind(OrderId).all();
    const orderLine = ol.results as Partial<Order>[];

    const owl: OrderWithLines = {
      order: order as Order,
      lines: orderLine as OrderLines[],
    };

    return owl;
  }

  async CreateOrderWithTrasaction(
    order: Partial<CreateOrderModel>
  ): Promise<Order> {
    debugger;
    const orderStatus = "New";
    let _order: Order = {
      orderId: null,
      status: orderStatus,
      locationId: order.locationId,
      totalAmount: 0,
      customerId: null,
    };

    await this.db.transaction(
      async (tx) => {
        debugger;
        //transaction begins
        const [createdOrder] = await this.db
          .insert(tables.order)
          .values(_order)
          .returning();
        const orderId = createdOrder.toString().padStart(7, "0"); // converting to string as a 7 char value
        _order = createdOrder;
        //updating orderId as a 7 char string value
        await this.db
          .update(tables.order)
          .set({ orderId })
          .where(eq(tables.order.id, createdOrder.id));
        //preparing orderlist with created orderId
        let orderLinesPrepared: OrderLines[] = await this.getOrderLinesPrepared(
          orderId,
          orderStatus,
          order
        );
        //inserting those prepared orderlines
        await this.db.insert(tables.orderLines).values(orderLinesPrepared);
        //transaction ends
      },
      {
        //transactional behaviour as per drizzle
        behavior: "deferred",
      }
    );
    return _order;
  }

  private async getOrderLinesPrepared(
    orderId: string,
    orderStatus: string,
    order: Partial<CreateOrderModel>
  ): Promise<OrderLines[]> {
    const itemIds = order.orders.map((x) => {
      return x.itemId;
    });
    const items = await this.db
      .select()
      .from(tables.items)
      .where(inArray(tables.items.id, itemIds))
      .execute();

    let _orderLines: OrderLines[] = [];
    if (order.orders.length > 0) {
      order.orders.forEach((line) => {
        let _line: OrderLines = {
          orderId: null,
          seatId: null,
          itemId: null,
          Preference: null,
          locationId: null,
          quantity: null,
          amount: null,
          totalAmount: null,
          status: "New",
        };
        const amount = items.find((x) => x.id == line.itemId).amount;
        _line.orderId = orderId;
        _line.seatId = line.seatId;
        _line.itemId = line.itemId.toString();
        _line.Preference = line.preference;
        _line.locationId = order.locationId;
        _line.status = orderStatus;
        _line.quantity = line.qty;
        _line.amount = amount;
        _line.totalAmount = (line.qty * amount);
        _orderLines.push(_line);
      });
    }
    return await _orderLines;
  }
}
