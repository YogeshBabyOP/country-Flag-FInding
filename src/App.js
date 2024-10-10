import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const sortedCountries = response.data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const TolgeeHelper = (event) => {
    const countryCode = event.target.value;
    const country = countries.find(c => c.cca2 === countryCode);
    setSelectedCountry(country);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Flag Country Finder 🌍</h1>
      <div style={styles.selectorContainer}>
        <select onChange={TolgeeHelper} defaultValue="" style={styles.dropdown}>
          <option value="" disabled>Select a country</option>
          {countries.map(country => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div style={styles.countryInfo}>
          <h2 style={styles.countryName}>{selectedCountry.name.common}</h2>
          <img src={selectedCountry.flags.png} alt="Flag" style={styles.flag} />
          <p><strong>Capital:</strong> {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {selectedCountry.region}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: '2.5rem',
    margin: '20px 0',
    textAlign: 'center',
  },
  selectorContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  dropdown: {
    padding: '10px 15px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    border: '2px solid #fff',
    backgroundColor: '#333',
    color: '#fff',
    outline: 'none',
    cursor: 'pointer',
    width: '200px',
  },
  countryInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#333',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
    marginTop: '30px',
  },
  countryName: {
    fontSize: '1.8rem',
    marginBottom: '15px',
  },
  flag: {
    width: '150px',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '20px',
    transition: 'transform 0.2s ease',
  },
};

export default App;