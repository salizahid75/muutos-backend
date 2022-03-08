  // file update request in form-data
  const file = req.file;

  const id = req.params.id;
  const data = JSON.parse(JSON.stringify(req.body));
  
  if (file == undefined) {
      console.log("file not found ");
      // data is empty or req.body is empty
      if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
          console.log("file not found and name not found");
          res.send({ status: "inactive", "data": 'no data to upload' });
      }
      else {

          console.log("file not found and name found");
          
          console.log(data);
          console.log(req.file);

          const productDB = await firestore.collection('products').doc(id);
          await productDB.update(data);
          res.send({ status: "active", "data": 'Product name updated successfully' });
      }

  } else if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log("name not found");
      res.send({ status: "inactive", "data": 'no data to upload' });
      if (file == undefined) {
          console.log("file not found and name not found");
          res.send({ status: "inactive", "data": 'no data to upload' });
      }
      else {
          console.log("file found and name not found");
          console.log(req.body);
          console.log(req.file);

          const imagePath = file.path;
          const uploadPath = "http://localhost:8080/" + imagePath;
          const newData = { "image": uploadPath }
          const productDB = await firestore.collection('products').doc(id);
          await productDB.update(newData);
          res.send({ status: "active", "data": 'Product image updated successfully' });
      }


  } else if (!(req.body.constructor === Object && Object.keys(req.body).length === 0) && !(file == undefined)) {

      console.log("file found and name found");
      console.log(req.body);
      console.log(req.file);

      try {
          // file upload request in form-data
          const rawData = req.body;

          // const filename = file.filename;

          console.log('raw-data:' + JSON.stringify(rawData) + ',\nfile:' + JSON.stringify(req.file))

          const productName = rawData.product_name;
          const price = rawData.price;
          const imagePath = file.path;
          const uploadPath = "http://localhost:8080/" + imagePath;

          const new_data = {
              "product_name": productName,
              "image": uploadPath,
              "price": price
          };
          console.log('data:' + JSON.stringify(new_data))

          const productDB = await firestore.collection('products').doc(id);
          await productDB.update(new_data);
          res.send({ status: "active", data: 'Product name and image updated successfully.' })
      }
      catch (error) {
          res.status(400).send({ status: "inactive", data: error.message });
      }
  } else {
      console.log("else");
      console.log(req.body);
      console.log(req.file);

      res.status(400).send({ status: "inactive", data: "error request" });
  }
