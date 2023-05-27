import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Trash3Fill } from 'react-bootstrap-icons';

const SERVER = process.env.REACT_APP_SERVER_URL;

function MyVerticallyCenteredModal(props) {
  const token = props.token;
  const handleDelete = () => {
      const deleteRequestOptions = {
          method: 'DELETE',
          headers: {
              "Authorization": "Bearer " + token,
          }
      }
      fetch(SERVER + 'degreeCourseApplications/' + props.applicationID, deleteRequestOptions)
          .then(res => {
              if (!res.status === 204) {
                  console.log("HIER");
              }
              return res
          })
          .then(res => {
              if (res.status === 204) {
                  alert("Delete SUCCESS.")
              }
          })
          .then(() => {
              props.onHide();
              props.newfetch();
          })

          .catch(e => console.log(e))
  }

  return (
      <Modal
          onHide={props.onHide}
          show={props.show}
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
          <Modal.Header closeButton>
              <Modal.Title id={props.id}>
                  Are you sure?
              </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
              <Button id='DeleteDialogCancelButton' variant='light' onClick={props.onHide}>No</Button>
              <Button id='DeleteDialogConfirmButton' variant="danger" onClick={() => {
                  handleDelete()
              }}>Yes</Button>
          </Modal.Footer>
      </Modal>
  );
}

function DeleteButton(props) {
  const [modalShow, setModalShow] = useState(false)
  const buttonID = "DegreeCourseApplicationItemDeleteButton" + props.application.degreeCourseName + props.application.targetPeriodYear;
  const dialogID = "DeleteDialogDegreeCourseApplication" + props.applicationID;
  console.log(props.application)
  return (
      <div>
          <Button
              id={buttonID}
              variant="outline-danger"
              onClick={() => {
                  setModalShow(true);
                  props.setIDFalseVisible();
              }}> <Trash3Fill size={25} /></Button>
          <MyVerticallyCenteredModal
              id={dialogID}
              show={modalShow}
              onHide={() => {
                setModalShow(false);
                props.setIDTrueVisible();
              }}
              applicationID={props.applicationID}
              token={props.token}
              newfetch={props.newfetch}
          />
      </div>
  )
}

export default DeleteButton