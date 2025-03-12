async function handler() {
    const session = getSession();
  
    if (!session?.user?.id) {
      return {
        error: "Not authenticated",
      };
    }
  
    try {
      const students = await sql(
        `SELECT s.*, u.name, u.email, u.image 
         FROM students s 
         JOIN auth_users u ON s.user_id = u.id 
         WHERE s.user_id = $1`,
        [session.user.id]
      );
  
      if (students.length === 0) {
        return {
          error: "Student profile not found",
        };
      }
  
      return {
        student: students[0],
      };
    } catch (error) {
      return {
        error: "Failed to retrieve student profile",
      };
    }
  }