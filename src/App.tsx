import React from "react";
import "./App.css";
import PhoneNumberInput from "./PhoneNumberInput";

const countries = [
  { code: "AD", label: "Andorra", phone: "376", phoneLength: 6 },
  { code: "AE", label: "United Arab Emirates", phone: "971", phoneLength: 9 },
  { code: "AF", label: "Afghanistan", phone: "93", phoneLength: 9 },
  { code: "IN", label: "India", phone: "91", phoneLength: 10 },
];

function App() {
  const [selectedPhoneNumber, setSelectedPhoneNumber] =
    React.useState<string>("");
  const [selectedCountryCode, setSelectedCountryCode] =
    React.useState<string>("");

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setSelectedPhoneNumber(phoneNumber);
  };

  const handleCountryCodeChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
  };

  const [isValid, setIsValid] = React.useState("");

  return (
    <div className="App">
      <div className="text-purple-200"> Hello world</div>
      <PhoneNumberInput
        countries={countries}
        defaultCountry={countries[3]}
        onPhoneNumberChange={handlePhoneNumberChange}
        onCountryCodeChange={handleCountryCodeChange}
        setIsValid={setIsValid}
      />
      {isValid && <>{isValid}</>}
      <div>
        <p>
          Selected Phone Number: {selectedCountryCode} {selectedPhoneNumber}
        </p>
        <p>Selected Country Code: {selectedCountryCode}</p>
      </div>
    </div>
  );
}

export default App;
