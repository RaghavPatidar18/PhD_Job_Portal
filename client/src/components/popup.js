import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

// async function getEmail() {
//   const token = localStorage.getItem('usersdatatoken');
//   // console.log(token);
//   const response = await fetch('/api/me', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   // console.log(data);
//   return data.email;
// }

async function getEmail() {
  const token = localStorage.getItem('usersdatatoken');
  return axios.get('/api/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response.data.email); // handle the response data
    console.log("insidde function of gate email");
    return response.data.email;
  }).catch((error) => {
    console.log(error); // handle the error
  });
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
      const response = await axios.post('/api/subscribe', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Subscription successful');
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error(error);
    }


    // try {
    //   const response = await fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email }),
    //   });
    //   if (response.ok) {
    //     console.log('Subscription successful');
    //   } else {
    //     console.error('Subscription failed');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    props.onClose(); // Close the popup
  };

  const handleUnsubscribe = async (event) => {
    event.preventDefault();
    const email = await getEmail();
    // console.log(email);

    try {
      const response = await axios.post('/api/unsubscribe', {
        email: email,
      });
      if (response.status === 200) {
        console.log('Unsubscription successful');
      } else {
        console.error('Unsubscription failed');
      }
    } catch (error) {
      console.error(error);
    }


    // try {
    //   const response = await fetch('/api/unsubscribe', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email }),
    //   });
    //   if (response.ok) {
    //     console.log('Unsubscription successful');
    //   } else {
    //     console.error('Unsubscription failed');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    props.onClose(); // Close the popup
  };
  return (
    <Modal show={props.show} onHide={props.onClose}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Subscribe
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Subscribe to get updated !
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleSubscribe} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-white capitalize transition-colors duration-300 transform border border-gray-200 rounded-md bg-green-600 hover:bg-green-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Subscribe
            </button>

            <button onClick={handleUnsubscribe} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md bg-red-600 hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Unsubscribe
            </button>
        </div>
    </div>
      {/*<Modal.Header closeButton>
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
      </Modal.Body>*/}
    </Modal>
  );
}

export default SubscribePopup;
