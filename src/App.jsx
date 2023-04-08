import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Modal, Form } from "react-bootstrap";
// import fecthdata from "./fuction";
function App() {
  const [bookdata, setBookdata] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editname, setEditname] = useState("");
  const [editprice, setEditprice] = useState("");
  const [show, setShow] = useState(false);
  const [selectedrow, setSelectedrow] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const resetfield = (e) => {
    e.preventDefault();
    setSearch("");
    getdata();
  };

  const handleClose = () => {
    setShow(false);
    setEditname("");
    setEditprice("");
  };

  const handleShow = (data, e) => {
    console.log("data", data);
    setShow(true);
    setSelectedrow(data.id);
    setEditname(data.name);
    setEditprice(data.price);
    // setPrice("");
  };

  // const searchbar = async (searchname) => {
  //   e.preventDefault();
  //   console.log("search = ", searchname);
  // };

  const getdata = async (searchname) => {
    console.log("searchname = ", searchname);
    await axios
      .get(`http://localhost:8000/api/book/getbook?searchname=${searchname ? searchname : ""}`)
      .then((response) => {
        console.log(response.data.item);
        setBookdata(response.data.item);
      });
  };

  const insertdata = async (e) => {
    await axios
      .post("http://localhost:8000/api/book/insertbook", {
        name: name,
        price: price,
      })
      .then(function (response) {
        console.log(response);
      });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Insert Your data Success",
      showConfirmButton: false,
      timer: 1500,
    });
    getdata();
    setName("");
    setPrice("");
  };

  const updatedata = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Update ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:8000/api/book/updatebook`, {
            id: selectedrow,
            name: editname,
            price: editprice,
          })
          .then((response) => {
            Swal.fire("Update!", "Your file has been Update.", "success");
            getdata();
            handleClose();
            setName("");
            setPrice("");
          });
      }
    });
  };

  const deletedata = async (id, e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/book/deletebook/${id}`)
          .then((response) => {
            console.log("Deleted !!", response);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getdata();
      }
    });
  };

  // const searchbox = (searchbar) => {
  //   console.log("searchnamewww = ", searchbar);
  //   let c = 0;
  //   if (searchbar != "") {
  //     let query = `?searchname=${searchbar ? searchbar : ""}`;
  //     getdata(query);
  //   }
  // };

  const inputname = (e) => {
    setName(e.target.value);
    console.log("name = ", name);
  };

  const inputsearch = (e) => {
    setSearch(e.target.value);
    console.log("name = ", search);
  };

  const inputprice = (e) => {
    setPrice(e.target.value);
    console.log("price = ", price);
  };

  const edit_name = (e) => {
    setEditname(e.target.value);
    console.log("edit_name = ", editname);
  };

  const edit_price = (e) => {
    setEditprice(e.target.value);
    console.log("edit_price = ", editprice);
  };

  // const onfinish = (value) => {
  //   value.preventDefault();
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to Update ?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Update it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios
  //         .put(`http://localhost:8000/api/book/updatebook`, {
  //           id: selectedrow,
  //           name: editname,
  //           price: editprice,
  //         })
  //         .then((response) => {
  //           Swal.fire("Update!", "Your file has been Update.", "success");
  //           getdata();
  //           handleClose();
  //           setName("");
  //           setPrice("");
  //         });
  //     }
  //   });
  // };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: "1%" }}>Book Shop</h1>
      <div>
        <form >
          <label className="header-text" style={{ marginTop: "1%" }}>
            ค้นหาจากชื่อสินค้า :{" "}
          </label>{" "}
          <input
            name="searchname"
            className="input-search"
            type="text"
            value={search}
            onChange={inputsearch}
            placeholder="ระบุชื่อสินค้า"
          ></input>
          <button type="submit" className="button-88">
            ค้นหา
          </button>
          <button onClick={resetfield} className="resetBut">
            รีเซ็ต
          </button>
        </form>
      </div>
      <div className="box-table">
        <table className="book-product">
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>

          {bookdata.map((v, k) => {
            return (
              <>
                <tr>
                  <td>{k + 1}</td>
                  <td>{v.name}</td>
                  <td>
                    {v.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <button
                      className="update"
                      type="submit"
                      onClick={(e) => handleShow(v, e)}
                    >
                      แก้ไขสินค้า
                    </button>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="delete"
                      onClick={(e) => deletedata(v.id, e)}
                    >
                      ลบสินค้า
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
      <label className="header-text" id="required">
        ชื่อสินค้า :{" "}
      </label>{" "}
      <input
        name="name"
        className="input-name"
        type="text"
        value={name}
        onChange={inputname}
        required
        placeholder="ระบุชื่อสินค้า เช่น หนังสือสตาร์วอร์"
      ></input>
      <br></br>
      <label className="header-text" id="required">
        ราคาสินค้า :{" "}
      </label>
      <input
        name="price"
        maxLength="7"
        className="input-price"
        type="number"
        value={price}
        onChange={inputprice}
        required
        placeholder="ราคา 1000 บาท"
      ></input>{" "}
      บาท <br></br>
      <button className="insert" type="submit" onClick={insertdata}>
        เพิ่มสินค้า
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>อัปเดทสินค้า</Modal.Title>
        </Modal.Header>
        <Form onSubmit={updatedata}>
          <Modal.Body>
            <Form.Control
              className="mb-3"
              name="edit-name"
              type="text"
              placeholder="ชื่อสินค้า"
              value={editname}
              onChange={edit_name}
            />
            <Form.Control
              type="number"
              name="edit-price"
              placeholder="ราคาสินค้า"
              value={editprice}
              onChange={edit_price}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
