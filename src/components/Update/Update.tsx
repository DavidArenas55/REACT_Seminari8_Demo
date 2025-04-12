import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { updateUser } from '../../services/usersService'; // Asumiendo que tienes la ruta para actualizar el usuario
import styles from './Update.module.css';

interface EditFormProps {
  user: User;
  onUserUpdated: () => void;
}

const UpdateUser: React.FC<EditFormProps> = ({ user, onUserUpdated }) => {
  const [inputValues, setInputValues] = useState<User>(user);

  useEffect(() => {
    setInputValues(user); // Actualizamos el estado cuando el usuario cambia
  }, [user]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: name === 'age' || name === 'phone' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aquí llamamos a la función updateUser para realizar la actualización
      if (user._id) {
        await updateUser(user._id, inputValues);
      } else {
        console.error('User ID is undefined');
        alert('User ID is missing, unable to update user.');
      }

      // Llamamos a onUserUpdated después de la actualización
      onUserUpdated();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user, please try again.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Update User</h3>

        {/* Nombre */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            className={styles.input}
          />
        </div>

        {/* Edad */}
        <div className={styles.formGroup}>
          <label htmlFor="age" className={styles.label}>Age</label>
          <input
            type="number"
            name="age"
            value={inputValues.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
            className={styles.input}
          />
        </div>

        {/* Correo */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className={styles.input}
          />
        </div>

        {/* Contraseña */}
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={inputValues.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className={styles.input}
          />
        </div>

        {/* Botón de envío */}
        <button type="submit" className={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;