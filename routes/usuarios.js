const express = require('express');
const router = express.Router();
const graphDBConnect = require('../middleware/connectNeo4j');

function formatResponse(resultObj) {
  const result = [];
  if (resultObj.records.length > 0) {
    resultObj.records.map(record => {
      result.push(record._fields[0].properties);
    });
  }
  return result;
}

router.post('/', async function(req, res) {
  const { id, nome, email } = req.body;
  if (!id || id < 1 || !nome || !email) {
    return res.status(400).send('Input inválido');
  }
  const query = `CREATE (n:Usuarios {id:$id, nome:$nome, email: $email}) RETURN n`;
  const params = {
    id: parseInt(id),
    nome,
    email
  };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.send(result);
});

router.get('/', async function(req, res) {
  const query = 'MATCH (n:Usuarios) RETURN n LIMIT 100';
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.send(result);
});

router.get('/:id', async function(req, res) {
  const { id } = req.params;
  const query = 'MATCH (n:Usuarios {id: $id}) RETURN n LIMIT 100';
  const params = { id: parseInt(id) };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.send(result);
});

router.patch('/:id', async function(req, res) {
  const { id } = req.params;
  const { nome, email } = req.body;
  let strName = nome ? ` n.nome = '${name}' ` : '';
  let strEmail = email ? ` n.email = '${email}' ` : '';
  if (strName && strEmail) {
    strEmail = ',' + strEmail;
  }
  const query = `MATCH (n:Usuarios {id: $id}) SET ${strName} ${strEmail} RETURN n`;
  const params = { id: parseInt(id) };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.send(result);
});

router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  const query = 'MATCH (n:Usuarios {id: $id}) DELETE n';
  const params = { id: parseInt(id) };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  res.send('Remoção bem-sucedida.');
});

module.exports = router;