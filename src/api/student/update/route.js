async function handler({ body }) {
    const session = getSession();
  
    if (!session?.user?.id) {
      return { error: "Not authenticated" };
    }
  
    const { name, image, grade_level, section } = body;
  
    try {
      if (name || image) {
        const authUpdateParts = [];
        const authValues = [];
        let authParamCount = 1;
  
        if (name) {
          authUpdateParts.push(`name = $${authParamCount}`);
          authValues.push(name);
          authParamCount++;
        }
  
        if (image) {
          authUpdateParts.push(`image = $${authParamCount}`);
          authValues.push(image);
          authParamCount++;
        }
  
        if (authUpdateParts.length > 0) {
          const authQuery = `UPDATE auth_users SET ${authUpdateParts.join(
            ", "
          )} WHERE id = $${authParamCount}`;
          await sql(authQuery, [...authValues, session.user.id]);
        }
      }
  
      if (grade_level || section) {
        const studentUpdateParts = [];
        const studentValues = [];
        let studentParamCount = 1;
  
        if (grade_level) {
          studentUpdateParts.push(`grade_level = $${studentParamCount}`);
          studentValues.push(grade_level);
          studentParamCount++;
        }
  
        if (section) {
          studentUpdateParts.push(`section = $${studentParamCount}`);
          studentValues.push(section);
          studentParamCount++;
        }
  
        if (studentUpdateParts.length > 0) {
          const studentQuery = `UPDATE students SET ${studentUpdateParts.join(
            ", "
          )} WHERE user_id = $${studentParamCount}`;
          await sql(studentQuery, [...studentValues, session.user.id]);
        }
      }
  
      return {
        message: "Profile updated successfully",
      };
    } catch (error) {
      return {
        error: "Failed to update profile",
      };
    }
  }