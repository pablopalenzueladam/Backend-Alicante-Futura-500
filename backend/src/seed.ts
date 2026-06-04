/**
 * seed.ts
 * Genera datos de prueba coherentes para la base de datos.
 * Uso: npx tsx --tsconfig tsconfig.seed.json seed.ts
 *
 * Dependencias:
 *   npm install @faker-js/faker bcryptjs better-sqlite3
 *   npm install -D @types/better-sqlite3 @types/bcryptjs
 */

import Database from "better-sqlite3";
import { fakerES as faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const DB_PATH = "./data/database.sqlite";
const TOTAL = 3000;
faker.seed(42);

// ─── TIPOS DE NEGOCIO + sus servicios coherentes ─────────────────────────────
const BUSINESS_TYPES = [
    {
        category: "Peluquería",
        services: [
            { name: "Corte de pelo", price: 15, duration: 30 },
            { name: "Tinte completo", price: 45, duration: 90 },
            { name: "Mechas", price: 55, duration: 120 },
            { name: "Peinado para evento", price: 35, duration: 60 },
            { name: "Tratamiento keratina", price: 80, duration: 150 },
            { name: "Corte y barba", price: 20, duration: 45 },
        ],
    },
    {
        category: "Centro de estética",
        services: [
            { name: "Manicura", price: 18, duration: 45 },
            { name: "Pedicura", price: 22, duration: 60 },
            { name: "Depilación piernas", price: 30, duration: 45 },
            { name: "Limpieza facial", price: 40, duration: 60 },
            { name: "Extensiones de pestañas", price: 50, duration: 90 },
            { name: "Micropigmentación cejas", price: 120, duration: 120 },
        ],
    },
    {
        category: "Clínica dental",
        services: [
            { name: "Revisión y limpieza", price: 60, duration: 60 },
            { name: "Empaste", price: 80, duration: 45 },
            { name: "Ortodoncia invisible", price: 2500, duration: 30 },
            { name: "Blanqueamiento dental", price: 150, duration: 90 },
            { name: "Extracción muela del juicio", price: 120, duration: 60 },
            { name: "Implante dental", price: 900, duration: 120 },
        ],
    },
    {
        category: "Taller mecánico",
        services: [
            { name: "Cambio de aceite", price: 45, duration: 30 },
            { name: "Revisión ITV", price: 35, duration: 60 },
            { name: "Cambio de frenos", price: 120, duration: 90 },
            { name: "Diagnóstico electrónico", price: 50, duration: 45 },
            { name: "Cambio de neumáticos", price: 80, duration: 60 },
            { name: "Reparación motor", price: 500, duration: 240 },
        ],
    },
    {
        category: "Consulta médica",
        services: [
            { name: "Consulta general", price: 50, duration: 30 },
            { name: "Analítica de sangre", price: 35, duration: 15 },
            { name: "Ecografía abdominal", price: 80, duration: 30 },
            { name: "Consulta dermatología", price: 70, duration: 30 },
            { name: "Vacunación", price: 25, duration: 15 },
            { name: "Electrocardiograma", price: 45, duration: 20 },
        ],
    },
    {
        category: "Gimnasio",
        services: [
            { name: "Sesión de personal trainer", price: 40, duration: 60 },
            { name: "Clase de yoga", price: 15, duration: 60 },
            { name: "Clase de spinning", price: 12, duration: 45 },
            { name: "Evaluación física inicial", price: 30, duration: 60 },
            { name: "Masaje deportivo", price: 55, duration: 60 },
            { name: "Nutrición deportiva (consulta)", price: 60, duration: 45 },
        ],
    },
    {
        category: "Veterinaria",
        services: [
            { name: "Consulta general", price: 40, duration: 30 },
            { name: "Vacunación antirrábica", price: 25, duration: 15 },
            { name: "Esterilización", price: 150, duration: 120 },
            { name: "Limpieza dental animal", price: 80, duration: 60 },
            { name: "Microchip", price: 30, duration: 15 },
            { name: "Análisis de sangre", price: 60, duration: 20 },
        ],
    },
    {
        category: "Psicología",
        services: [
            { name: "Primera consulta", price: 60, duration: 60 },
            { name: "Sesión terapia individual", price: 55, duration: 50 },
            { name: "Terapia de pareja", price: 80, duration: 60 },
            { name: "Terapia infantil", price: 50, duration: 45 },
            { name: "Evaluación psicológica", price: 120, duration: 90 },
            { name: "EMDR (trauma)", price: 70, duration: 60 },
        ],
    },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function weightedStatus(statuses: string[], weights: number[]): string {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < statuses.length; i++) {
        r -= weights[i];
        if (r <= 0) return statuses[i];
    }
    return statuses[statuses.length - 1];
}

function randomDate(start: Date, end: Date): string {
    const d = faker.date.between({ from: start, to: end });
    return d.toISOString().split("T")[0];
}

function randomTime(): string {
    const h = faker.number.int({ min: 8, max: 20 });
    const m = faker.helpers.arrayElement([0, 15, 30, 45]);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function randomPhone(): string {
    const prefix = faker.helpers.arrayElement(["6", "7"]);
    const rest = Array.from({ length: 8 }, () => faker.number.int({ min: 0, max: 9 })).join("");
    return `${prefix}${rest}`;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ── 1. NEGOCIOS ───────────────────────────────────────────────────────────────
console.log("🏪 Insertando negocios...");

const insertBusiness = db.prepare(`
  INSERT INTO business (name, address, zipcode, email, phone, maxCustomers)
  VALUES (@name, @address, @zipcode, @email, @phone, @maxCustomers)
`);

const insertedBusinesses: { id: number; typeIdx: number }[] = [];

const insertManyBusinesses = db.transaction(() => {
    for (let i = 0; i < TOTAL; i++) {
        const typeIdx = i % BUSINESS_TYPES.length;
        const cat = BUSINESS_TYPES[typeIdx].category;
        const name = `${cat} ${faker.person.lastName()} - ${faker.location.city()}`;

        const result = insertBusiness.run({
            name,
            address: faker.location.streetAddress(),
            zipcode: faker.location.zipCode("#####"),
            email: `negocio_${i}_${faker.internet.email().toLowerCase()}`,
            phone: randomPhone(),
            maxCustomers: faker.number.int({ min: 1, max: 20 }),
        });
        insertedBusinesses.push({ id: result.lastInsertRowid as number, typeIdx });
    }
});
insertManyBusinesses();
console.log(`  ✅ ${TOTAL} negocios insertados`);

// ── 2. SERVICIOS ──────────────────────────────────────────────────────────────
console.log("🛠  Insertando servicios...");

const insertService = db.prepare(`
  INSERT INTO service (name, price, durationMinutes, businessId)
  VALUES (@name, @price, @durationMinutes, @businessId)
`);

const businessServices: Map<number, { name: string; price: number }[]> = new Map();

const insertManyServices = db.transaction(() => {
    for (const { id, typeIdx } of insertedBusinesses) {
        const pool = BUSINESS_TYPES[typeIdx].services;
        const count = faker.number.int({ min: 2, max: pool.length });
        const chosen = faker.helpers.shuffle([...pool]).slice(0, count);

        const serviceList: { name: string; price: number }[] = [];
        for (const svc of chosen) {
            insertService.run({
                name: svc.name,
                price: svc.price,
                durationMinutes: svc.duration,
                businessId: id,
            });
            serviceList.push({ name: svc.name, price: svc.price });
        }
        businessServices.set(id, serviceList);
    }
});
insertManyServices();
console.log(`  ✅ Servicios insertados`);

// ── 3. CLIENTES ───────────────────────────────────────────────────────────────
console.log("👤 Insertando clientes...");

const insertCustomer = db.prepare(`
  INSERT INTO customer (name, email, phone, businessId, password, role)
  VALUES (@name, @email, @phone, @businessId, @password, @role)
`);

const insertedCustomerIds: number[] = [];
const passwordHash = bcrypt.hashSync("password123", 10);

const insertManyCustomers = db.transaction(() => {
    for (let i = 0; i < TOTAL; i++) {
        const biz = faker.helpers.arrayElement(insertedBusinesses);
        const result = insertCustomer.run({
            name: faker.person.fullName(),
            email: `cliente_${i}_${faker.internet.email().toLowerCase()}`,
            phone: randomPhone(),
            businessId: biz.id,
            password: passwordHash,
            role: "user",
        });
        insertedCustomerIds.push(result.lastInsertRowid as number);
    }
});
insertManyCustomers();
console.log(`  ✅ ${TOTAL} clientes insertados`);

// ── 4. CITAS ──────────────────────────────────────────────────────────────────
console.log("📅 Insertando citas...");

const insertAppointment = db.prepare(`
  INSERT INTO appointment (date, time, status, customerId, businessId, serviceName, serviceId)
  VALUES (@date, @time, @status, @customerId, @businessId, @serviceName, @serviceId)
`);

const insertedAppointmentIds: number[] = [];
const appointmentAmounts: Map<number, number> = new Map();

const insertManyAppointments = db.transaction(() => {
    for (let i = 0; i < TOTAL; i++) {
        const biz = faker.helpers.arrayElement(insertedBusinesses);
        const services = businessServices.get(biz.id) ?? [{ name: "Servicio general", price: 30 }];
        const svc = faker.helpers.arrayElement(services);
        const customerId = faker.helpers.arrayElement(insertedCustomerIds);

        const status = weightedStatus(["pending", "confirmed", "cancelled", "completed"], [20, 50, 10, 20]);
        const isPast = status === "completed" || status === "cancelled";

        const date = isPast
            ? randomDate(new Date("2024-01-01"), new Date())
            : randomDate(new Date(), new Date("2026-12-31"));

        const result = insertAppointment.run({
            date,
            time: randomTime(),
            status,
            customerId,
            businessId: biz.id,
            serviceName: svc.name,
            serviceId: null,
        });

        const appointmentId = result.lastInsertRowid as number;
        insertedAppointmentIds.push(appointmentId);
        appointmentAmounts.set(appointmentId, svc.price);
    }
});
insertManyAppointments();
console.log(`  ✅ ${TOTAL} citas insertadas`);

// ── 5. PAGOS ──────────────────────────────────────────────────────────────────
console.log("💳 Insertando pagos...");

const insertPayment = db.prepare(`
  INSERT INTO payment (appointmentId, customerId, amount, status, createdAt)
  VALUES (@appointmentId, @customerId, @amount, @status, @createdAt)
`);

const getAppointment = db.prepare("SELECT customerId, status, businessId FROM appointment WHERE id = ?");

const insertManyPayments = db.transaction(() => {
    for (const apptId of insertedAppointmentIds) {
        const appt = getAppointment.get(apptId) as { customerId: number; status: string };
        const amount = appointmentAmounts.get(apptId) ?? 30;

        let paymentStatus: string;
        if (appt.status === "completed") {
            paymentStatus = faker.helpers.weightedArrayElement([
                { weight: 90, value: "paid" },
                { weight: 10, value: "refunded" },
            ]);
        } else if (appt.status === "cancelled") {
            paymentStatus = faker.helpers.weightedArrayElement([
                { weight: 60, value: "refunded" },
                { weight: 40, value: "failed" },
            ]);
        } else if (appt.status === "confirmed") {
            paymentStatus = faker.helpers.weightedArrayElement([
                { weight: 70, value: "paid" },
                { weight: 30, value: "pending" },
            ]);
        } else {
            paymentStatus = faker.helpers.weightedArrayElement([
                { weight: 60, value: "pending" },
                { weight: 40, value: "failed" },
            ]);
        }

        insertPayment.run({
            appointmentId: apptId,
            customerId: appt.customerId,
            amount,
            status: paymentStatus,
            createdAt: faker.date
                .between({ from: new Date("2024-01-01"), to: new Date() })
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
        });
    }
});
insertManyPayments();
console.log(`  ✅ ${TOTAL} pagos insertados`);

// ── 6. RESEÑAS ────────────────────────────────────────────────────────────────
console.log("⭐ Insertando reseñas...");

const insertReview = db.prepare(`
  INSERT INTO review (rating, comment, customerId, businessId, createdAt)
  VALUES (@rating, @comment, @customerId, @businessId, @createdAt)
`);

const reviewComments: Record<number, string[]> = {
    5: ["Excelente servicio, muy profesionales.", "Volveré sin duda, todo perfecto.", "El mejor sitio de la zona, 100% recomendado.", "Increíble atención y resultados espectaculares."],
    4: ["Muy buena experiencia en general.", "Buen servicio, aunque el tiempo de espera fue algo largo.", "Profesionales y amables, repetiré.", "Muy satisfecho, solo mejoraría el aparcamiento."],
    3: ["Servicio correcto, nada especial.", "Cumple lo que promete pero sin más.", "Precio algo elevado para lo que ofrecen.", "Normal, ni bien ni mal."],
    2: ["Esperaba más por el precio.", "El trato fue algo frío.", "No volveré, hay mejores opciones.", "Tardaron mucho y el resultado fue mediocre."],
    1: ["Muy mala experiencia, no lo recomiendo.", "Pésimo servicio, tuve que volver para que lo arreglaran.", "No volvería ni regalado.", "Fatal, tiempo de espera eterno y mal resultado."],
};

const completedAppointments = insertedAppointmentIds.filter((id) => {
    const a = getAppointment.get(id) as { status: string };
    return a.status === "completed";
});

const insertManyReviews = db.transaction(() => {
    for (const apptId of completedAppointments) {
        if (Math.random() > 0.4) continue;
        const appt = getAppointment.get(apptId) as { customerId: number; businessId: number; status: string };

        const rating = faker.helpers.weightedArrayElement([
            { weight: 5, value: 1 },
            { weight: 10, value: 2 },
            { weight: 20, value: 3 },
            { weight: 35, value: 4 },
            { weight: 30, value: 5 },
        ]);

        insertReview.run({
            rating,
            comment: faker.helpers.arrayElement(reviewComments[rating]),
            customerId: appt.customerId,
            businessId: appt.businessId,
            createdAt: faker.date
                .between({ from: new Date("2024-01-01"), to: new Date() })
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
        });
    }
});
insertManyReviews();
console.log(`  ✅ Reseñas insertadas`);

db.close();
console.log("\n🎉 Seed completado con éxito.");