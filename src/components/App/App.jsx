import './App.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import ItemCard from '../ItemCard/ItemCard.jsx';

function App() {
  // Example props/state for demonstration
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const weather = { temp: 22, description: 'Sunny' };
  const item = { name: 'Sample Item' };

  return (
    <div>
      <Header />
      <Main>
        <WeatherCard weather={weather} />
        <ItemCard item={item} onClick={setSelectedItem} />
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      </Main>
      <Footer />
      <ModalWithForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Modal With Form</h2>
        {/* Form content here */}
      </ModalWithForm>
      <ItemModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

export default App
