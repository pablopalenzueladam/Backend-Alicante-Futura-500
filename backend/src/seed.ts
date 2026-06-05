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
    { name: 'Peluquería Nova',         email: 'nova@peluqueria.es',       phone: '965111001', address: 'Calle Mayor 10',         zipcode: '03001', maxCustomers: 10, services: ['Corte de pelo', 'Tinte', 'Peinado nupcial', 'Mechas', 'Alisado'] },
    { name: 'Restaurante Marea',        email: 'marea@restaurante.es',     phone: '965111002', address: 'Avenida del Mar 5',       zipcode: '03002', maxCustomers: 50, services: ['Menú del día', 'Reserva para 2', 'Reserva para 4', 'Cena romántica', 'Celebración especial'] },
    { name: 'Clínica Dental Sonrisa',   email: 'sonrisa@dental.es',        phone: '965111003', address: 'Calle Salud 3',           zipcode: '03003', maxCustomers: 15, services: ['Revisión dental', 'Limpieza bucal', 'Empaste', 'Ortodoncia', 'Blanqueamiento'] },
    { name: 'Gimnasio FitZone',         email: 'fitzone@gym.es',           phone: '965111004', address: 'Avenida Deporte 8',       zipcode: '03004', maxCustomers: 100, services: ['Clase de spinning', 'Entrenamiento personal', 'Clase de zumba', 'Musculación', 'Pilates'] },
    { name: 'Spa Relax',                email: 'relax@spa.es',             phone: '965111005', address: 'Calle Bienestar 2',       zipcode: '03005', maxCustomers: 20, services: ['Masaje relajante', 'Masaje deportivo', 'Envoltura de chocolate', 'Facial hidratante', 'Aromaterapia'] },
    { name: 'Taller AutoPro',           email: 'autopro@taller.es',        phone: '965111006', address: 'Polígono Industrial 4',   zipcode: '03006', maxCustomers: 8,  services: ['Cambio de aceite', 'Revisión ITV', 'Cambio de frenos', 'Diagnóstico electrónico', 'Cambio de neumáticos'] },
    { name: 'Academia English Plus',    email: 'english@academia.es',      phone: '965111007', address: 'Calle Idiomas 7',         zipcode: '03007', maxCustomers: 30, services: ['Clase de inglés A1', 'Clase de inglés B2', 'Preparación Cambridge', 'Conversación avanzada', 'Business English'] },
    { name: 'Clínica Fisio Move',       email: 'move@fisio.es',            phone: '965111008', address: 'Calle Movimiento 1',      zipcode: '03008', maxCustomers: 12, services: ['Sesión de fisioterapia', 'Electroterapia', 'Masaje terapéutico', 'Rehabilitación deportiva', 'Punción seca'] },
    { name: 'Fotografía Luz',           email: 'luz@fotografia.es',        phone: '965111009', address: 'Calle Arte 9',            zipcode: '03009', maxCustomers: 5,  services: ['Sesión de fotos', 'Reportaje de boda', 'Fotos de producto', 'Retrato profesional', 'Fotografía familiar'] },
    { name: 'Barbería El Navajero',     email: 'navajero@barberia.es',     phone: '965111010', address: 'Calle Barba 6',           zipcode: '03010', maxCustomers: 8,  services: ['Corte caballero', 'Arreglo de barba', 'Afeitado clásico', 'Corte + barba', 'Tinte de barba'] },
    { name: 'Veterinaria Patitas',      email: 'patitas@vet.es',           phone: '965111011', address: 'Calle Animales 11',       zipcode: '03011', maxCustomers: 20, services: ['Vacunación antirrábica', 'Revisión general', 'Desparasitación', 'Castración', 'Limpieza dental canina'] },
    { name: 'Centro Yoga Zen',          email: 'zen@yoga.es',              phone: '965111012', address: 'Calle Paz 12',            zipcode: '03012', maxCustomers: 25, services: ['Clase de yoga Hatha', 'Yoga Vinyasa', 'Meditación guiada', 'Yoga restaurativo', 'Pranayama'] },
    { name: 'Nutrición Vital',          email: 'vital@nutricion.es',       phone: '965111013', address: 'Calle Salud 13',          zipcode: '03013', maxCustomers: 15, services: ['Consulta inicial', 'Plan de alimentación', 'Seguimiento mensual', 'Dieta deportiva', 'Nutrición infantil'] },
    { name: 'Estudio Pilates Core',     email: 'core@pilates.es',          phone: '965111014', address: 'Avenida Cuerpo 14',       zipcode: '03014', maxCustomers: 18, services: ['Pilates suelo', 'Pilates máquina', 'Pilates prenatal', 'Pilates terapéutico', 'Clase grupal'] },
    { name: 'Centro Estética Bella',    email: 'bella@estetica.es',        phone: '965111015', address: 'Calle Belleza 15',        zipcode: '03015', maxCustomers: 10, services: ['Depilación láser', 'Manicura', 'Pedicura', 'Microblading', 'Extensiones de pestañas'] },
    { name: 'Psicología Mente Sana',    email: 'mente@psicologia.es',      phone: '965111016', address: 'Calle Mente 16',          zipcode: '03016', maxCustomers: 10, services: ['Terapia individual', 'Terapia de pareja', 'Terapia infantil', 'Terapia de grupo', 'Evaluación psicológica'] },
    { name: 'Óptica Visión Clara',      email: 'vision@optica.es',         phone: '965111017', address: 'Calle Vista 17',          zipcode: '03017', maxCustomers: 15, services: ['Revisión visual', 'Adaptación lentillas', 'Examen fondo de ojo', 'Terapia visual', 'Adaptación gafas'] },
    { name: 'Clínica Podología Pie',    email: 'pie@podologia.es',         phone: '965111018', address: 'Calle Pie 18',            zipcode: '03018', maxCustomers: 12, services: ['Quiropodología', 'Plantillas personalizadas', 'Uña encarnada', 'Electroestimulación', 'Biomecánica'] },
    { name: 'Autoescuela Vial',         email: 'vial@autoescuela.es',      phone: '965111019', address: 'Avenida Vial 19',         zipcode: '03019', maxCustomers: 30, services: ['Clase práctica coche', 'Clase práctica moto', 'Examen teórico', 'Clase nocturna', 'Clase autovía'] },
    { name: 'Academia Música Nota',     email: 'nota@musica.es',           phone: '965111020', address: 'Calle Música 20',         zipcode: '03020', maxCustomers: 20, services: ['Clase de guitarra', 'Clase de piano', 'Clase de violín', 'Canto lírico', 'Percusión'] },
  ];

  const businesses: Business[] = [];
  for (const b of businessesData) {
    const { services: _, ...businessData } = b;
    const business = await AppDataSource.getRepository(Business).save(businessData);
    businesses.push(business);
  }

  const firstNames = ['María', 'Carlos', 'Ana', 'Juan', 'Laura', 'Pedro', 'Sofía', 'Miguel', 'Elena', 'David',
    'Isabel', 'Antonio', 'Carmen', 'Francisco', 'Lucía', 'Javier', 'Marta', 'Roberto', 'Patricia', 'Alejandro',
    'Cristina', 'Fernando', 'Raquel', 'Sergio', 'Natalia', 'Víctor', 'Beatriz', 'Óscar', 'Silvia', 'Rubén',
    'Mónica', 'Ignacio', 'Pilar', 'Andrés', 'Teresa', 'Diego', 'Verónica', 'Pablo', 'Amparo', 'Álvaro',
    'Nuria', 'Rafael', 'Susana', 'Enrique', 'Rosa', 'Guillermo', 'Yolanda', 'Marcos', 'Consuelo', 'Adrián'];

  const lastNames = ['López', 'Pérez', 'García', 'Martínez', 'Sánchez', 'Romero', 'Torres', 'Flores', 'Ruiz', 'Moreno',
    'Jiménez', 'Díaz', 'Álvarez', 'Muñoz', 'Gutiérrez', 'Hernández', 'Vargas', 'Castro', 'Ramos', 'Molina',
    'Ortega', 'Gil', 'Serrano', 'Blanco', 'Reyes', 'Mendoza', 'Suárez', 'Iglesias', 'Cano', 'Peña'];

  const customers: Customer[] = [];
  for (let i = 0; i < 100; i++) {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[i % lastNames.length];
    const customer = await AppDataSource.getRepository(Customer).save({
      name: `${first} ${last}`,
      email: `cliente${i + 1}@gmail.com`,
      phone: `6${String(i + 1).padStart(8, '0')}`,
      password: '123456',
      businessId: businesses[i % businesses.length].id,
    });
    customers.push(customer);
  }

  const statuses = [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.CONFIRMED];
  const appointments: Appointment[] = [];

  for (let i = 0; i < 100; i++) {
    const businessIndex = i % businesses.length;
    const business = businesses[businessIndex];
    const businessServices = businessesData[businessIndex].services;
    const serviceName = businessServices[i % businessServices.length];
    const day = String((i % 28) + 1).padStart(2, '0');
    const month = i < 50 ? '06' : '07';
    const hour = String(9 + (i % 9)).padStart(2, '0');
    const minute = i % 2 === 0 ? '00' : '30';

    const appointment = await AppDataSource.getRepository(Appointment).save({
      date: `2026-${month}-${day}`,
      time: `${hour}:${minute}`,
      status: statuses[i % statuses.length],
      customerId: customers[i % customers.length].id,
      businessId: business.id,
      serviceName,
    });
    appointments.push(appointment);
  }

  const paymentStatuses = [PaymentStatus.COMPLETED, PaymentStatus.PENDING, PaymentStatus.COMPLETED];
  const amounts = [25, 40, 60, 80, 35, 50, 90, 20, 75, 45, 30, 55, 65, 100, 120];

  for (let i = 0; i < 100; i++) {
    await AppDataSource.getRepository(Payment).save({
      appointmentId: appointments[i].id,
      customerId: customers[i % customers.length].id,
      amount: amounts[i % amounts.length],
      status: paymentStatuses[i % paymentStatuses.length],
    });
  }

  console.log('✅ Seed completado con 20 negocios, 100 clientes, 100 citas y 100 pagos!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});