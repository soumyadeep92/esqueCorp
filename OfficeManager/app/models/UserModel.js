module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
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
      allowNull:true,
      references:{
        model:'offices',
        key:'id'
      }
    },
    officer_id:{
      type:Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:'officers',
        key:'id'
      }
    },
    email_id:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    isLoggedIn:{
        type:Sequelize.BOOLEAN
    }
  });

  return user
};