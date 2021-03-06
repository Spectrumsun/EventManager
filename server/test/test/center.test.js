import request from 'supertest';
import chai from 'chai';
import server from '../../server';
import testData from '../Faker/centerFaker';
import { validToken, adminToken } from '../../test/test/user.test';
import deletePicture from '../../handlers/deleteImage';

const { expect } = chai;

describe('Event Manager Center Test', () => {
  it('loads the api home page', (done) => {
    request(server)
      .get('/api/v1/')
      .expect(200)
      .end((err) => {
        if (err) {
          done(err);
        }
        done();
      });
  });


  it('return error if token is not present when adding new center', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You need to sign up or login');
        if (error) done(error);
        done();
      });
  });


  it('return error if token is not vaild when adding new center', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter)
      .set('Authorization', 'jdjdjdjdjdj')
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('Authentication failed');
        if (error) done(error);
        done();
      });
  });


  it('return error if login user is not an admin when adding new center', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter5)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.message).to.include('You have to be an Admin to do that');
        if (error) done(error);
        done();
      });
  });


  it('return error if login is admin and center name is empty', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.errorMessage).to.include('You must supply a Center  name!');
        if (error) done(error);
        done();
      });
  });

  it('return error if login is admin and center city is empty', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter1)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.errorMessage).to.include('You must supply a city !');
        if (error) done(error);
        done();
      });
  });

  it('return error if login is admin and center address is empty', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter2)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.errorMessage).to.include('You must supply a address!');
        if (error) done(error);
        done();
      });
  });

  it(
    'return error if login is admin and center publicUrlId is empty',
    (done) => {
      request(server)
        .post('/api/v1/centers')
        .send(testData.newCenter3)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(403);
          expect(res.body.errorMessage).to.include('You add public Id from cloudinary!');
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'return error if login is admin and center publicUrlId is empty',
    (done) => {
      request(server)
        .post('/api/v1/centers')
        .send(testData.newCenter33)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(403);
          expect(res.body.errorMessage)
            .to.include('You must add imageurl form cloudinary!');
          if (error) done(error);
          done();
        });
    }
  );

  it('return error if login is admin and center about is empty', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter4)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(403);
        expect(res.body.errorMessage).to.include('You must About for center!');
        if (error) done(error);
        done();
      });
  });

  it(
    'save center 3 to database if login is' +
    'admin and and body is filed correctly',
    (done) => {
      request(server)
        .post('/api/v1/centers')
        .send(testData.newCenter5)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.message)
            .to.include('successfully created');
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'save center 4 to database if login is' +
    'admin and and body is filed correctly',
    (done) => {
      request(server)
        .post('/api/v1/centers')
        .send(testData.newCenter5)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.message)
            .to.include('successfully created');
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'save center 5 to database if login is' +
    'admin and and body is filed correctly',
    (done) => {
      request(server)
        .post('/api/v1/centers')
        .send(testData.newCenter5)
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.message).to.include('successfully created');
          if (error) done(error);
          done();
        });
    }
  );

  it('save center to database if login is admin and and body is filed correctly', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter5)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(201);
        expect(res.body.message).to.include('successfully created');
        if (error) done(error);
        done();
      });
  });


  it('return all the centers in database', (done) => {
    request(server)
      .get('/api/v1/centers')
      .expect(200)
      .end((error, res) => {
        expect(200);
        expect(res.body.message).to.include('success');
        if (error) done(error);
        done();
      });
  });

  it('return 1 center from the databse', (done) => {
    request(server)
      .get('/api/v1/centers/1')
      .expect(200)
      .end((error, res) => {
        expect(200);
        expect(res.body.message).to.include('Center');
        if (error) done(error);
        done();
      });
  });

  it('return error if center is not found in the  database', (done) => {
    request(server)
      .get('/api/v1/centers/100')
      .expect(400)
      .end((error, res) => {
        expect(200);
        expect(res.body.message).to.include('center not found');
        if (error) done(error);
        done();
      });
  });


  it('save another center to database if login is admin and and body is filed correctly', (done) => {
    request(server)
      .post('/api/v1/centers')
      .send(testData.newCenter5)
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(201);
        expect(res.body.message).to.include('successfully created');
        if (error) done(error);
        done();
      });
  });


  it('return error if login user is not an admin when updating center', (done) => {
    request(server)
      .put('/api/v1/centers/1')
      .send(testData.newCenter6)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.message).to.include('You have to be an Admin to do that');
        if (error) done(error);
        done();
      });
  });


  it('return error if login user is not an admin when deleting center', (done) => {
    request(server)
      .delete('/api/v1/centers/3')
      .send(testData.newCenter6)
      .set('Authorization', validToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.message).to.include('You have to be an Admin to do that');
        if (error) done(error);
        done();
      });
  });


  it(
    'save new center to database if login and' +
    'admin with correctly filed data',
    (done) => {
      request(server)
        .post('/api/v1/centers')
        .send({
          name: 'center name updated',
          city: 'lagos island',
          address: 'No 22 Lagos island',
          facility: ['car pack', 'free wifi', 'sound system'],
          about: 'this is a test',
          availability: 'availability',
          imageurl: 'pictue.png',
          publicUrlId: 'picture'
        })
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.message)
            .to.include('successfully created');
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'edit a center if login and' +
    'admin and body is filed correctly',
    (done) => {
      request(server)
        .put('/api/v1/centers/6')
        .send({
          name: 'center name updated',
          city: 'lagos island',
          address: 'No 22 Lagos island',
          facility: ['car pack', 'free wifi', 'sound system'],
          about: 'this is a test',
          availability: 'availability',
          imageurl: 'pictue.png',
          publicUrlId: 'picture'
        })
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body)
            .to.include({});
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'catch invailed url',
    (done) => {
      request(server)
        .put('/api/v1/centers/')
        .send({
          name: 'center name updated',
          city: 'lagos island',
          address: 'No 22 Lagos island',
          facility: ['car pack', 'free wifi', 'sound system'],
          about: 'this is a test',
          availability: 'availability',
          imageurl: 'pictue.png',
          publicUrlId: 'picture'
        })
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(201);
          expect(res.body.message)
            .to.include('That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫');
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'return error for invalid url invent center when user is signing in',
    (done) => {
      request(server)
        .get('/api/v1/centers/swew')
        .send({
          imageurl: 'pictue.png',
          publicUrlId: 'picture'
        })
        .end((error, res) => {
          expect(404);
          expect(res.body.message)
            .to.include('Invalid Parameter In Url');
          if (error) done(error);
          done();
        });
    }
  );

  it(
    'return error for invalid url invent center when admin enters invalided center id',
    (done) => {
      request(server)
        .delete('/api/v1/centers/swew')
        .set('Authorization', adminToken.token)
        .end((error, res) => {
          expect(404);
          expect(res.body.message)
            .to.include('Invalid Parameter In Url');
          if (error) done(error);
          done();
        });
    }
  );

  it('return error if center is not found in db when deleting delete center', (done) => {
    request(server)
      .delete('/api/v1/centers/33')
      .set('Authorization', adminToken.token)
      .end((error, res) => {
        expect(400);
        expect(res.body.message).to.include('You dont own any center with that id');
        if (error) done(error);
        done();
      });
  });

  it('return search result for search center', (done) => {
    request(server)
      .get('/api/v1/centers/search?searchString=center')
      .send(testData.newCenter)
      .end((error, res) => {
        expect(200);
        expect(res.body.result).to.include([]);
        if (error) done(error);
        done();
      });
  });

  it('return search result with pagination for search center', (done) => {
    request(server)
      .get('/api/v1/centers/search?searchString=center&limit=1&page=1')
      .send(testData.newCenter)
      .end((error, res) => {
        expect(200);
        expect(res.body.match).to.include('1 Found that Match Your Search');
        if (error) done(error);
        done();
      });
  });

  it('return error if limit Page is not a number', (done) => {
    request(server)
      .get('/api/v1/centers?limit=abc')
      .end((error, res) => {
        expect(400);
        expect(res.body.message).to.include('Limit or Page must be a number');
        if (error) done(error);
        done();
      });
  });
});
