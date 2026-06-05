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
  await AppDataSource.getRepository(Service).clear();
  await AppDataSource.getRepository(Customer).clear();
  await AppDataSource.getRepository(Business).clear();

  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='business'`);
  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='customer'`);
  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='appointment'`);
  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='payment'`);
  await AppDataSource.query(`DELETE FROM sqlite_sequence WHERE name='service'`);

  const businessesData = [
    { name: 'Peluquería Nova',         email: 'nova@peluqueria.es',       phone: '965111001', address: 'Calle Mayor 10',         zipcode: '03001', maxCustomers: 10,  services: [{ name: 'Corte de pelo', price: 20 }, { name: 'Tinte', price: 45 }, { name: 'Peinado nupcial', price: 80 }, { name: 'Mechas', price: 60 }, { name: 'Alisado', price: 55 }] },
    { name: 'Restaurante Marea',        email: 'marea@restaurante.es',     phone: '965111002', address: 'Avenida del Mar 5',       zipcode: '03002', maxCustomers: 50,  services: [{ name: 'Menú del día', price: 15 }, { name: 'Reserva para 2', price: 40 }, { name: 'Reserva para 4', price: 80 }, { name: 'Cena romántica', price: 120 }, { name: 'Celebración especial', price: 200 }] },
    { name: 'Clínica Dental Sonrisa',   email: 'sonrisa@dental.es',        phone: '965111003', address: 'Calle Salud 3',           zipcode: '03003', maxCustomers: 15,  services: [{ name: 'Revisión dental', price: 30 }, { name: 'Limpieza bucal', price: 50 }, { name: 'Empaste', price: 80 }, { name: 'Ortodoncia', price: 1500 }, { name: 'Blanqueamiento', price: 200 }] },
    { name: 'Gimnasio FitZone',         email: 'fitzone@gym.es',           phone: '965111004', address: 'Avenida Deporte 8',       zipcode: '03004', maxCustomers: 100, services: [{ name: 'Clase de spinning', price: 10 }, { name: 'Entrenamiento personal', price: 40 }, { name: 'Clase de zumba', price: 10 }, { name: 'Musculación', price: 35 }, { name: 'Pilates', price: 15 }] },
    { name: 'Spa Relax',                email: 'relax@spa.es',             phone: '965111005', address: 'Calle Bienestar 2',       zipcode: '03005', maxCustomers: 20,  services: [{ name: 'Masaje relajante', price: 60 }, { name: 'Masaje deportivo', price: 70 }, { name: 'Envoltura de chocolate', price: 90 }, { name: 'Facial hidratante', price: 55 }, { name: 'Aromaterapia', price: 50 }] },
    { name: 'Taller AutoPro',           email: 'autopro@taller.es',        phone: '965111006', address: 'Polígono Industrial 4',   zipcode: '03006', maxCustomers: 8,   services: [{ name: 'Cambio de aceite', price: 40 }, { name: 'Revisión ITV', price: 25 }, { name: 'Cambio de frenos', price: 150 }, { name: 'Diagnóstico electrónico', price: 60 }, { name: 'Cambio de neumáticos', price: 200 }] },
    { name: 'Academia English Plus',    email: 'english@academia.es',      phone: '965111007', address: 'Calle Idiomas 7',         zipcode: '03007', maxCustomers: 30,  services: [{ name: 'Clase de inglés A1', price: 25 }, { name: 'Clase de inglés B2', price: 30 }, { name: 'Preparación Cambridge', price: 50 }, { name: 'Conversación avanzada', price: 35 }, { name: 'Business English', price: 40 }] },
    { name: 'Clínica Fisio Move',       email: 'move@fisio.es',            phone: '965111008', address: 'Calle Movimiento 1',      zipcode: '03008', maxCustomers: 12,  services: [{ name: 'Sesión de fisioterapia', price: 45 }, { name: 'Electroterapia', price: 30 }, { name: 'Masaje terapéutico', price: 50 }, { name: 'Rehabilitación deportiva', price: 55 }, { name: 'Punción seca', price: 40 }] },
    { name: 'Fotografía Luz',           email: 'luz@fotografia.es',        phone: '965111009', address: 'Calle Arte 9',            zipcode: '03009', maxCustomers: 5,   services: [{ name: 'Sesión de fotos', price: 100 }, { name: 'Reportaje de boda', price: 800 }, { name: 'Fotos de producto', price: 150 }, { name: 'Retrato profesional', price: 120 }, { name: 'Fotografía familiar', price: 200 }] },
    { name: 'Barbería El Navajero',     email: 'navajero@barberia.es',     phone: '965111010', address: 'Calle Barba 6',           zipcode: '03010', maxCustomers: 8,   services: [{ name: 'Corte caballero', price: 15 }, { name: 'Arreglo de barba', price: 10 }, { name: 'Afeitado clásico', price: 20 }, { name: 'Corte + barba', price: 22 }, { name: 'Tinte de barba', price: 18 }] },
    { name: 'Veterinaria Patitas',      email: 'patitas@vet.es',           phone: '965111011', address: 'Calle Animales 11',       zipcode: '03011', maxCustomers: 20,  services: [{ name: 'Vacunación antirrábica', price: 30 }, { name: 'Revisión general', price: 25 }, { name: 'Desparasitación', price: 20 }, { name: 'Castración', price: 150 }, { name: 'Limpieza dental canina', price: 80 }] },
    { name: 'Centro Yoga Zen',          email: 'zen@yoga.es',              phone: '965111012', address: 'Calle Paz 12',            zipcode: '03012', maxCustomers: 25,  services: [{ name: 'Clase de yoga Hatha', price: 12 }, { name: 'Yoga Vinyasa', price: 14 }, { name: 'Meditación guiada', price: 10 }, { name: 'Yoga restaurativo', price: 12 }, { name: 'Pranayama', price: 10 }] },
    { name: 'Nutrición Vital',          email: 'vital@nutricion.es',       phone: '965111013', address: 'Calle Salud 13',          zipcode: '03013', maxCustomers: 15,  services: [{ name: 'Consulta inicial', price: 60 }, { name: 'Plan de alimentación', price: 80 }, { name: 'Seguimiento mensual', price: 40 }, { name: 'Dieta deportiva', price: 70 }, { name: 'Nutrición infantil', price: 55 }] },
    { name: 'Estudio Pilates Core',     email: 'core@pilates.es',          phone: '965111014', address: 'Avenida Cuerpo 14',       zipcode: '03014', maxCustomers: 18,  services: [{ name: 'Pilates suelo', price: 15 }, { name: 'Pilates máquina', price: 25 }, { name: 'Pilates prenatal', price: 20 }, { name: 'Pilates terapéutico', price: 30 }, { name: 'Clase grupal', price: 12 }] },
    { name: 'Centro Estética Bella',    email: 'bella@estetica.es',        phone: '965111015', address: 'Calle Belleza 15',        zipcode: '03015', maxCustomers: 10,  services: [{ name: 'Depilación láser', price: 80 }, { name: 'Manicura', price: 25 }, { name: 'Pedicura', price: 30 }, { name: 'Microblading', price: 200 }, { name: 'Extensiones de pestañas', price: 60 }] },
    { name: 'Psicología Mente Sana',    email: 'mente@psicologia.es',      phone: '965111016', address: 'Calle Mente 16',          zipcode: '03016', maxCustomers: 10,  services: [{ name: 'Terapia individual', price: 70 }, { name: 'Terapia de pareja', price: 90 }, { name: 'Terapia infantil', price: 65 }, { name: 'Terapia de grupo', price: 40 }, { name: 'Evaluación psicológica', price: 120 }] },
    { name: 'Óptica Visión Clara',      email: 'vision@optica.es',         phone: '965111017', address: 'Calle Vista 17',          zipcode: '03017', maxCustomers: 15,  services: [{ name: 'Revisión visual', price: 30 }, { name: 'Adaptación lentillas', price: 50 }, { name: 'Examen fondo de ojo', price: 40 }, { name: 'Terapia visual', price: 45 }, { name: 'Adaptación gafas', price: 25 }] },
    { name: 'Clínica Podología Pie',    email: 'pie@podologia.es',         phone: '965111018', address: 'Calle Pie 18',            zipcode: '03018', maxCustomers: 12,  services: [{ name: 'Quiropodología', price: 35 }, { name: 'Plantillas personalizadas', price: 120 }, { name: 'Uña encarnada', price: 40 }, { name: 'Electroestimulación', price: 30 }, { name: 'Biomecánica', price: 60 }] },
    { name: 'Autoescuela Vial',         email: 'vial@autoescuela.es',      phone: '965111019', address: 'Avenida Vial 19',         zipcode: '03019', maxCustomers: 30,  services: [{ name: 'Clase práctica coche', price: 30 }, { name: 'Clase práctica moto', price: 35 }, { name: 'Examen teórico', price: 20 }, { name: 'Clase nocturna', price: 40 }, { name: 'Clase autovía', price: 45 }] },
    { name: 'Academia Música Nota',     email: 'nota@musica.es',           phone: '965111020', address: 'Calle Música 20',         zipcode: '03020', maxCustomers: 20,  services: [{ name: 'Clase de guitarra', price: 25 }, { name: 'Clase de piano', price: 30 }, { name: 'Clase de violín', price: 35 }, { name: 'Canto lírico', price: 28 }, { name: 'Percusión', price: 22 }] },
  ];

  const businesses: Business[] = [];
  for (const b of businessesData) {
    const { services, ...businessData } = b;

    // Guardar negocio
    const business = await AppDataSource.getRepository(Business).save(businessData);

    // Guardar servicios asociados al negocio
    await AppDataSource.getRepository(Service).save(
      services.map((s) => ({
        name: s.name,
        price: s.price,
        businessId: business.id,
      }))
    );

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
    const serviceName = businessServices[i % businessServices.length].name;
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

  console.log('✅ Seed completado con 20 negocios, 100 servicios, 100 clientes, 100 citas y 100 pagos!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});