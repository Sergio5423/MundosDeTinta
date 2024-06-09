const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ventas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fk_empleados_cedula: {
      type: DataTypes.STRING(10),
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'cedula'
      }
    },
    fk_productos_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    id_factura: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ventas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_empleados_cedula",
        using: "BTREE",
        fields: [
          { name: "fk_empleados_cedula" },
        ]
      },
      {
        name: "fk_productos_id",
        using: "BTREE",
        fields: [
          { name: "fk_productos_id" },
        ]
      },
    ]
  });
};