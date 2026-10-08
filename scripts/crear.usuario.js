const [nombre, email, edad] = process.argv.slice(2);

if (!nombre || !email || !edad) {
  console.log('Uso: npm run usuario -- "Nombre" "correo@email.com" edad');
  process.exit(1);
}

async function crearUsuario() {
  try {
    const respuesta = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, edad: Number(edad) }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      console.log('Error:', datos);
      process.exit(1);
    }

    console.log('Usuario creado:', datos);
  } catch (error) {
    console.log('No se pudo conectar. ¿Está corriendo npm run start:dev?');
    process.exit(1);
  }
}

crearUsuario();