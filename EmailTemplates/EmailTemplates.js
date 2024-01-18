const T1Template = (companyname) =>
  `<div>Form T1 is submitted as follows: <br><h3>Company Name: </h3>${companyname}</div>`;

  const welcomeEmail = (clientName, username) =>
    `<p>Welcome ${clientName}, your username is ${username}.</p>`;

  module.exports= { T1Template, welcomeEmail };
