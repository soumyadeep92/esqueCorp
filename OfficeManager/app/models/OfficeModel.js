module.exports = (sequelize, Sequelize) => {
  const Office = sequelize.define("office", {
    id: {
      primaryKey:true, 
      type: Sequelize.INTEGER,
      allowNull:false
    },
    name:{
      type:Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    no_of_rooms: {
      type: Sequelize.INTEGER
    },
    no_of_members:{
      type:Sequelize.INTEGER
    },
    is_mnc:{
      type:Sequelize.BOOLEAN
    }
  });

  return Office
};