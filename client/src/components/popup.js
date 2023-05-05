import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

async function getEmail() {
  const token = localStorage.getItem('usersdatatoken');
  // console.log(token);
  const response = await fetch('/api/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  // console.log(data);
  return data.email;
}

function SubscribePopup(props) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    const email = await getEmail();
    // console.log(email);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        console.log('Subscription successful');
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error(error);
    }
    props.onClose(); // Close the popup
  };

  const handleUnsubscribe = async (event) => {
    event.preventDefault();
    const email = await getEmail();
    // console.log(email);
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        console.log('Unsubscription successful');
      } else {
        console.error('Unsubscription failed');
      }
    } catch (error) {
      console.error(error);
    }
    props.onClose(); // Close the popup
  };
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Subscribe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Subscribe to get Updated</Form.Label>
          </Form.Group>

          <Button onClick={handleSubscribe} variant="outline-success" style={{ marginRight: '10px' }}>
            Subscribe
          </Button>
          <Button onClick={handleUnsubscribe} variant="outline-secondary" style={{ marginLeft: '10px' }}>
            Unsubscribe
          </Button>



        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SubscribePopup;
