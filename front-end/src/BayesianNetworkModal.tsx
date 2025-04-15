import BayesianNetworkGraph from './BayesianNetworkGraph';
import { Modal } from 'react-bootstrap';

interface Props {
  show: boolean;
  onHide: () => void;
}

export default function BayesianNetworkModal({ show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Bayesian Network Structure</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BayesianNetworkGraph />
      </Modal.Body>
    </Modal>
  );
}
