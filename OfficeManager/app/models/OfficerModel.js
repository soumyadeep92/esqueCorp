module.exports = (sequelize, Sequelize) => {
  const Officer = sequelize.define("officer", {
    id: {
      primaryKey:true,
      type: Sequelize.INTEGER,
      allowNull:false
    },
    name:{
      type:Sequelize.STRING
    },
    office_id:{
      type:Sequelize.INTEGER,
      references:{
        model:'offices',
        key:'id'
      }
    },
    description: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    date_of_birth:{
      type:Sequelize.STRING
    },
    room_id:{
      type:Sequelize.INTEGER
    },
    is_officer:{
      type:Sequelize.BOOLEAN
    },
    is_manager:{
      type:Sequelize.BOOLEAN
    },
    is_non_officer:{
      type:Sequelize.BOOLEAN
    },
    portfolio:{
      type:Sequelize.STRING
    },
    user_id:{
      type:Sequelize.INTEGER,
      references:{
        model:'users',
        key:'id'
      }
    }
  });

  return Officer
};