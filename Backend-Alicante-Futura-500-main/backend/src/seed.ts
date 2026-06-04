import { DataSource } from 'typeorm';
import { Appointment, AppointmentStatus } from './appointments/appointment.entity';
import { Customer } from './customers/customer.entity';
import { Business } from './businesses/business.entity';
import { Payment, PaymentStatus } from './payments/payments.entity';
import { Service } from './services/service.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/database.sqlite',
  entities: [Appointment, Customer, Business, Payment, Service],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  await AppDataSource.getRepository(Payment).clear();
  await AppDataSource.getRepository(Appointment).clear();
  await AppDataSource.getRepository(Customer).clear();
  await AppDataSource.getRepository(Business).clear();

  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='business'`);
  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='customer'`);
  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='appointment'`);
  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='payment'`);

  const businessesData = [
    { name: 'Peluquería Nova', email: 'nova@peluqueria.es', phone: '965111001', address: 'Calle Mayor 10', zipcode: '03001', maxCustomers: 10 },
    { name: 'Restaurante Marea', email: 'marea@restaurante.es', phone: '965111002', address: 'Avenida del Mar 5', zipcode: '03002', maxCustomers: 50 },
    { name: 'Clínica Dental Sonrisa', email: 'sonrisa@dental.es', phone: '965111003', address: 'Calle Salud 3', zipcode: '03003', maxCustomers: 15 },
    { name: 'Gimnasio FitZone', email: 'fitzone@gym.es', phone: '965111004', address: 'Avenida Deporte 8', zipcode: '03004', maxCustomers: 100 },
    { name: 'Spa Relax', email: 'relax@spa.es', phone: '965111005', address: 'Calle Bienestar 2', zipcode: '03005', maxCustomers: 20 },
    { name: 'Taller AutoPro', email: 'autopro@taller.es', phone: '965111006', address: 'Polígono Industrial 4', zipcode: '03006', maxCustomers: 8 },
    { name: 'Academia English Plus', email: 'english@academia.es', phone: '965111007', address: 'Calle Idiomas 7', zipcode: '03007', maxCustomers: 30 },
    { name: 'Clínica Fisio Move', email: 'move@fisio.es', phone: '965111008', address: 'Calle Movimiento 1', zipcode: '03008', maxCustomers: 12 },
    { name: 'Fotografía Luz', email: 'luz@fotografia.es', phone: '965111009', address: 'Calle Arte 9', zipcode: '03009', maxCustomers: 5 },
    { name: 'Barbería El Navajero', email: 'navajero@barberia.es', phone: '965111010', address: 'Calle Barba 6', zipcode: '03010', maxCustomers: 8 },
    { name: 'Veterinaria Patitas', email: 'patitas@vet.es', phone: '965111011', address: 'Calle Animales 11', zipcode: '03011', maxCustomers: 20 },
    { name: 'Centro Yoga Zen', email: 'zen@yoga.es', phone: '965111012', address: 'Calle Paz 12', zipcode: '03012', maxCustomers: 25 },
    { name: 'Nutrición Vital', email: 'vital@nutricion.es', phone: '965111013', address: 'Calle Salud 13', zipcode: '03013', maxCustomers: 15 },
    { name: 'Estudio Pilates Core', email: 'core@pilates.es', phone: '965111014', address: 'Avenida Cuerpo 14', zipcode: '03014', maxCustomers: 18 },
    { name: 'Centro Estética Bella', email: 'bella@estetica.es', phone: '965111015', address: 'Calle Belleza 15', zipcode: '03015', maxCustomers: 10 },
    { name: 'Tintorería Express', email: 'express@tintoreria.es', phone: '965111016', address: 'Calle Limpieza 16', zipcode: '03016', maxCustomers: 30 },
    { name: 'Guardería Sol', email: 'sol@guarderia.es', phone: '965111017', address: 'Calle Infancia 17', zipcode: '03017', maxCustomers: 40 },
    { name: 'Psicología Mente Sana', email: 'mente@psicologia.es', phone: '965111018', address: 'Calle Mente 18', zipcode: '03018', maxCustomers: 10 },
    { name: 'Óptica Visión Clara', email: 'vision@optica.es', phone: '965111019', address: 'Calle Vista 19', zipcode: '03019', maxCustomers: 15 },
    { name: 'Panadería El Horno', email: 'horno@panaderia.es', phone: '965111020', address: 'Calle Pan 20', zipcode: '03020', maxCustomers: 50 },
    { name: 'Lavandería Blanca', email: 'blanca@lavanderia.es', phone: '965111021', address: 'Calle Blanca 21', zipcode: '03021', maxCustomers: 20 },
    { name: 'Consultoría Legal Lex', email: 'lex@consultoria.es', phone: '965111022', address: 'Calle Derecho 22', zipcode: '03022', maxCustomers: 10 },
    { name: 'Agencia Viajes Mundo', email: 'mundo@viajes.es', phone: '965111023', address: 'Avenida Viaje 23', zipcode: '03023', maxCustomers: 25 },
    { name: 'Floristería Primavera', email: 'primavera@flores.es', phone: '965111024', address: 'Calle Flores 24', zipcode: '03024', maxCustomers: 15 },
    { name: 'Clínica Acupuntura Chi', email: 'chi@acupuntura.es', phone: '965111025', address: 'Calle Chi 25', zipcode: '03025', maxCustomers: 8 },
    { name: 'Escuela Danza Ritmo', email: 'ritmo@danza.es', phone: '965111026', address: 'Calle Baile 26', zipcode: '03026', maxCustomers: 35 },
    { name: 'Taxi Rápido', email: 'rapido@taxi.es', phone: '965111027', address: 'Avenida Transporte 27', zipcode: '03027', maxCustomers: 5 },
    { name: 'Mudanzas Pronto', email: 'pronto@mudanzas.es', phone: '965111028', address: 'Calle Carga 28', zipcode: '03028', maxCustomers: 5 },
    { name: 'Cerrajería 24h', email: 'cerrajeria@24h.es', phone: '965111029', address: 'Calle Llave 29', zipcode: '03029', maxCustomers: 5 },
    { name: 'Electricista Chispa', email: 'chispa@electricista.es', phone: '965111030', address: 'Calle Corriente 30', zipcode: '03030', maxCustomers: 5 },
  ];

  const businesses: Business[] = [];
  for (const b of businessesData) {
    const business = await AppDataSource.getRepository(Business).save(b);
    businesses.push(business);
  }

  const customersData = [
    { name: 'María López', email: 'maria@gmail.com', phone: '600000001', password: '123456' },
    { name: 'Carlos Pérez', email: 'carlos@gmail.com', phone: '600000002', password: '123456' },
    { name: 'Ana García', email: 'ana@gmail.com', phone: '600000003', password: '123456' },
    { name: 'Juan Martínez', email: 'juan@gmail.com', phone: '600000004', password: '123456' },
    { name: 'Laura Sánchez', email: 'laura@gmail.com', phone: '600000005', password: '123456' },
    { name: 'Pedro Romero', email: 'pedro@gmail.com', phone: '600000006', password: '123456' },
    { name: 'Sofía Torres', email: 'sofia@gmail.com', phone: '600000007', password: '123456' },
    { name: 'Miguel Flores', email: 'miguel@gmail.com', phone: '600000008', password: '123456' },
    { name: 'Elena Ruiz', email: 'elena@gmail.com', phone: '600000009', password: '123456' },
    { name: 'David Moreno', email: 'david@gmail.com', phone: '600000010', password: '123456' },
    { name: 'Isabel Jiménez', email: 'isabel@gmail.com', phone: '600000011', password: '123456' },
    { name: 'Antonio Díaz', email: 'antonio@gmail.com', phone: '600000012', password: '123456' },
    { name: 'Carmen Álvarez', email: 'carmen@gmail.com', phone: '600000013', password: '123456' },
    { name: 'Francisco Muñoz', email: 'francisco@gmail.com', phone: '600000014', password: '123456' },
    { name: 'Lucía Gutiérrez', email: 'lucia@gmail.com', phone: '600000015', password: '123456' },
    { name: 'Javier Hernández', email: 'javier@gmail.com', phone: '600000016', password: '123456' },
    { name: 'Marta Vargas', email: 'marta@gmail.com', phone: '600000017', password: '123456' },
    { name: 'Roberto Castro', email: 'roberto@gmail.com', phone: '600000018', password: '123456' },
    { name: 'Patricia Ramos', email: 'patricia@gmail.com', phone: '600000019', password: '123456' },
    { name: 'Alejandro Molina', email: 'alejandro@gmail.com', phone: '600000020', password: '123456' },
    { name: 'Cristina Ortega', email: 'cristina@gmail.com', phone: '600000021', password: '123456' },
    { name: 'Fernando Gil', email: 'fernando@gmail.com', phone: '600000022', password: '123456' },
    { name: 'Raquel Serrano', email: 'raquel@gmail.com', phone: '600000023', password: '123456' },
    { name: 'Sergio Blanco', email: 'sergio@gmail.com', phone: '600000024', password: '123456' },
    { name: 'Natalia Reyes', email: 'natalia@gmail.com', phone: '600000025', password: '123456' },
    { name: 'Víctor Mendoza', email: 'victor@gmail.com', phone: '600000026', password: '123456' },
    { name: 'Beatriz Suárez', email: 'beatriz@gmail.com', phone: '600000027', password: '123456' },
    { name: 'Óscar Iglesias', email: 'oscar@gmail.com', phone: '600000028', password: '123456' },
    { name: 'Silvia Cano', email: 'silvia@gmail.com', phone: '600000029', password: '123456' },
    { name: 'Rubén Peña', email: 'ruben@gmail.com', phone: '600000030', password: '123456' },
  ];

  const customers: Customer[] = [];
  for (let i = 0; i < customersData.length; i++) {
    const customer = await AppDataSource.getRepository(Customer).save({
      ...customersData[i],
      businessId: businesses[i % businesses.length].id,
    });
    customers.push(customer);
  }

  const serviceNames = ['Corte de pelo', 'Menú del día', 'Revisión dental', 'Clase de yoga', 'Masaje relajante', 'Cambio de aceite', 'Clase de inglés', 'Sesión de fisio', 'Sesión de fotos', 'Arreglo de barba'];
  const statuses = [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.PENDING];

  const appointments: Appointment[] = [];
  for (let i = 0; i < 30; i++) {
    const day = String(i + 1).padStart(2, '0');
    const hour = (9 + (i % 8)).toString().padStart(2, '0');
    const appointment = await AppDataSource.getRepository(Appointment).save({
      date: `2026-06-${day}`,
      time: `${hour}:00`,
      status: statuses[i % statuses.length],
      customerId: customers[i].id,
      businessId: businesses[i % businesses.length].id,
      serviceName: serviceNames[i % serviceNames.length],
    });
    appointments.push(appointment);
  }

  const paymentStatuses = [PaymentStatus.COMPLETED, PaymentStatus.PENDING, PaymentStatus.COMPLETED];
  const amounts = [25, 40, 60, 80, 35, 50, 90, 20, 75, 45];

  for (let i = 0; i < 30; i++) {
    await AppDataSource.getRepository(Payment).save({
      appointmentId: appointments[i].id,
      customerId: customers[i].id,
      amount: amounts[i % amounts.length],
      status: paymentStatuses[i % paymentStatuses.length],
    });
  }

  console.log('✅ Seed completado con 30 negocios, 30 clientes, 30 citas y 30 pagos!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});