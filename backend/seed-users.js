/**
 * seed-users.js
 *
 * Creates real Supabase Auth users + profile rows for each role.
 * Run ONCE after setting up the database:
 *
 *   node seed-users.js
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const USERS = [
  // Admins
  { email: 'admin@hippocare.com',           password: 'Admin@123',    name: 'Admin User',         role: 'admin'   },

  // Doctors (all 8 departments)
  { email: 'aisha.verma@hippocare.com',     password: 'Doctor@123',   name: 'Dr. Aisha Verma',    role: 'doctor'  },
  { email: 'rohan.mehta@hippocare.com',     password: 'Doctor@123',   name: 'Dr. Rohan Mehta',    role: 'doctor'  },
  { email: 'priya.singh@hippocare.com',     password: 'Doctor@123',   name: 'Dr. Priya Singh',    role: 'doctor'  },
  { email: 'arjun.rao@hippocare.com',       password: 'Doctor@123',   name: 'Dr. Arjun Rao',      role: 'doctor'  },
  { email: 'sneha.reddy@hippocare.com',     password: 'Doctor@123',   name: 'Dr. Sneha Reddy',    role: 'doctor'  },
  { email: 'rekha.sharma@hippocare.com',    password: 'Doctor@123',   name: 'Dr. Rekha Sharma',   role: 'doctor'  },
  { email: 'vikram.joshi@hippocare.com',    password: 'Doctor@123',   name: 'Dr. Vikram Joshi',   role: 'doctor'  },
  { email: 'kavita.desai@hippocare.com',    password: 'Doctor@123',   name: 'Dr. Kavita Desai',   role: 'doctor'  },

  // Patients
  { email: 'patient@hippocare.com',         password: 'Patient@123',  name: 'Rahul Nair',         role: 'patient' },

  // Staff
  { email: 'staff@hippocare.com',           password: 'Staff@123',    name: 'Priya Nair',         role: 'staff'   },
];

async function seed() {
  console.log('Seeding users...\n');
  const created = [];

  for (const user of USERS) {
    const { data, error: authErr } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
    });

    if (authErr) {
      if (authErr.message.includes('already been registered')) {
        console.log(`  SKIP  ${user.role.padEnd(8)} ${user.email} (already exists)`);
      } else {
        console.log(`  FAIL  ${user.role.padEnd(8)} ${user.email} — ${authErr.message}`);
      }
      continue;
    }

    const { error: profileErr } = await supabase
      .from('profiles')
      .upsert([{
        id: data.user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }], { onConflict: 'id' });

    if (profileErr) {
      console.log(`  WARN  ${user.role.padEnd(8)} ${user.email} — auth created but profile failed: ${profileErr.message}`);
    } else {
      console.log(`  OK    ${user.role.padEnd(8)} ${user.email} -> ${data.user.id}`);
    }

    created.push({ ...user, id: data.user.id });
  }

  console.log('\n--- Seed complete ---');
  console.log('\nLogin credentials (password is the same for each role):');
  console.log('┌──────────┬────────────────────────────────────┬──────────────┐');
  console.log('│ Role     │ Email                              │ Password     │');
  console.log('├──────────┼────────────────────────────────────┼──────────────┤');
  for (const u of USERS) {
    console.log(`│ ${u.role.padEnd(8)} │ ${u.email.padEnd(34)} │ ${u.password.padEnd(12)} │`);
  }
  console.log('└──────────┴────────────────────────────────────┴──────────────┘');

  if (created.length > 0) {
    console.log('\nNewly created user IDs:');
    for (const c of created) {
      console.log(`  ${c.name.padEnd(22)} -> ${c.id}`);
    }
  }
}

seed().catch(console.error);
