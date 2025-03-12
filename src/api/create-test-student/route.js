async function handler({ studentId, name, contactNumber }) {
    const session = getSession();
    if (!session?.user?.id || !session?.user?.email) {
      return { error: "Not authenticated" };
    }
  
    if (!studentId || !contactNumber) {
      return { error: "Student ID and contact number are required" };
    }
  
    if (!/^\d{7}$/.test(studentId)) {
      return { error: "Invalid student ID format. Must be 7 digits" };
    }
  
    if (!/^\d{11}$/.test(contactNumber)) {
      return { error: "Contact number must be 11 digits" };
    }
  
    const existingStudentById = await sql`
      SELECT * FROM students WHERE student_id = ${studentId}
    `;
  
    if (existingStudentById.length > 0) {
      return { error: "Student ID already registered" };
    }
  
    const existingStudentByUser = await sql`
      SELECT * FROM students WHERE user_id = ${session.user.id}
    `;
  
    if (existingStudentByUser.length > 0) {
      return { student: existingStudentByUser[0] };
    }
  
    const newStudent = await sql`
      INSERT INTO students (
        user_id,
        student_id, 
        grade_level,
        section,
        created_at,
        updated_at
      ) VALUES (
        ${session.user.id},
        ${studentId},
        ${7},
        ${"A"},
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      ) RETURNING *
    `;
  
    return { student: newStudent[0] };
  }