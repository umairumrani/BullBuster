import { users, menuItems, orders, contacts, type User, type InsertUser, type MenuItem, type InsertMenuItem, type Order, type InsertOrder, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  getOrder(orderNumber: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(orderNumber: string, status: string): Promise<Order | undefined>;
  
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private menuItems: Map<number, MenuItem>;
  private orders: Map<string, Order>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentMenuItemId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.orders = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentMenuItemId = 1;
    this.currentContactId = 1;
    this.seedMenuItems();
  }

  private seedMenuItems() {
    const items: MenuItem[] = [
      {
        id: 1,
        name: "Bull Signature Burger",
        description: "Double beef patty, special sauce, fresh vegetables, premium bun",
        price: 89900, // Rs. 899
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
      },
      {
        id: 2,
        name: "Crispy Chicken Deluxe",
        description: "Tender chicken breast, crispy coating, mayo, lettuce",
        price: 79900, // Rs. 799
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1606755962773-d324e2dea5f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
      },
      {
        id: 3,
        name: "Loaded Bull Fries",
        description: "Crispy fries, melted cheese, jalapenos, special sauce",
        price: 49900, // Rs. 499
        category: "Sides",
        image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
      },
      {
        id: 4,
        name: "Chocolate Thunder Shake",
        description: "Rich chocolate, vanilla ice cream, whipped cream, cherry",
        price: 39900, // Rs. 399
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
      },
      {
        id: 5,
        name: "Grilled Chicken Wrap",
        description: "Grilled chicken, fresh veggies, special sauce, soft tortilla",
        price: 64900, // Rs. 649
        category: "Wraps",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
      },
      {
        id: 6,
        name: "Buffalo Wings",
        description: "Spicy buffalo wings, blue cheese dip, celery sticks",
        price: 74900, // Rs. 749
        category: "Sides",
        image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        available: true,
      },
    ];

    items.forEach(item => {
      this.menuItems.set(item.id, item);
      this.currentMenuItemId = Math.max(this.currentMenuItemId, item.id + 1);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.category === category
    );
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = this.currentMenuItemId++;
    const item: MenuItem = { ...insertItem, id };
    this.menuItems.set(id, item);
    return item;
  }

  async getOrder(orderNumber: string): Promise<Order | undefined> {
    return this.orders.get(orderNumber);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const orderNumber = `BB${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const now = new Date();
    const order: Order = {
      ...insertOrder,
      id: Date.now(),
      orderNumber,
      createdAt: now,
      updatedAt: now,
    };
    this.orders.set(orderNumber, order);
    return order;
  }

  async updateOrderStatus(orderNumber: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(orderNumber);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      this.orders.set(orderNumber, order);
    }
    return order;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
