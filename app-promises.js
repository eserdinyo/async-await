const users = [{
  id: 1,
  name: 'Andrew',
  schoolId: 101
}, {
  id: 2,
  name: 'Jessica',
  schoolId: 999,
}]

const grades = [{
  id: 1,
  schoolId: 999,
  grade: 86
}, {
  id: 2,
  schoolId: 201,
  grade: 100
}, {
  id: 3,
  schoolId: 101,
  grade: 80
}];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id == id);

    if (user) {
      resolve(user);
    } else {
      reject('Unable to find user');
    }
  })
};


const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId == schoolId));
  })
};

// Andrew has a 83% in the class
const getStatus = userId => {
  let user;
  return getUser(userId).then(tempuUser => {
    user = tempuUser;
    return getGrades(user.schoolId);
  }).then(grades => {
    let avarage = 0;
    if (grades.length > 0) {
      avarage = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has a ${avarage}% in the class.`
  })
}

// async await
getStatusAlt = async (userId) => {
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);

  let avarage = 0;
  if (grades.length > 0) {
    avarage = grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }

  return `${user.name} has a ${avarage}% in the class.`
};

getStatusAlt(2).then(status => {
  console.log(status);
}).catch(e => {
  console.log(e);
})










/* getStatus(1).then((status) => {
  console.log(status);

}).catch(e => {
  console.log(e);
})  */