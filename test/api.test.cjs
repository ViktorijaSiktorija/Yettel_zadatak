const supertest = require('supertest');
const { app } = require('../server');
let expect;

let adminToken = process.env.ADMIN_TOKEN;
let taskId;

before(async () => {
  const chai = await import('chai');
  expect = chai.expect;
});

describe('Task and User API Integration Tests', () => {
  it('should allow a basic user to create a task', async () => {
    const response = await supertest(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${basicToken}`)
      .send({ body: 'Basic user task', userId: 1 })
      .expect(201);

    taskId = response.body.id;
    expect(taskId).to.be.a('number');
  });

  it('should allow a basic user to view their tasks', async () => {
    const response = await supertest(app)
      .get('/user/1')
      .set('Authorization', `Bearer ${basicToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).to.equal(true);
    expect(response.body[0]).to.have.property('body');
  });

  it('should allow a basic user to update their own tasks', async () => {
    const response = await supertest(app)
      .put(`/tasks/${taskId}`)
      .send({ body: 'Updated Task', userId: 1 })
      .set('Authorization', `Bearer ${basicToken}`)
      .expect(200);

    expect(response.body).to.have.property(
      'message',
      'Task updated successfully'
    );
  });

  it('should prevent a basic user from updating another user’s task', async () => {
    await supertest(app)
      .put('/tasks/999')
      .set('Authorization', `Bearer ${basicToken}`)
      .send({ body: 'Unauthorized update' })
      .expect(403);
  });

  it('should prevent a basic user from deleting a task', async () => {
    await supertest(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${basicToken}`)
      .expect(403);
  });

  it('should allow an admin to delete a task', async () => {
    const response = await supertest(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body.message).to.equal('Task deleted successfully');
  });

  it('should allow an admin to see all tasks', async () => {
    const response = await supertest(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should allow an admin to update any task', async () => {
    const response = await supertest(app)
      .put(`/tasks/1`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ body: 'Admin updated task' })
      .expect(200);

    expect(response.body).to.have.property(
      'message',
      'Task updated successfully'
    );
    expect(response.body).to.have.property('body', 'Admin updated task');
  });

  it('should prevent a basic user from seeing all tasks', async () => {
    await supertest(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${basicToken}`)
      .expect(403);
  });
});
