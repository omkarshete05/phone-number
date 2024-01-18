import React, { useState } from "react";

export interface Country {
  code: string;
  label: string;
  phone: string;
  phoneLength: number;
}

interface PhoneNumberInputProps {
  countries: Country[];
  defaultCountry: Country;
  onPhoneNumberChange: (phoneNumber: string) => void;
  onCountryCodeChange: (countryCode: string) => void;
  setIsValid: React.Dispatch<React.SetStateAction<string>>;
}

export default function PhoneNumberInput({
  countries,
  defaultCountry,
  onPhoneNumberChange,
  onCountryCodeChange,
  setIsValid,
}: PhoneNumberInputProps) {
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.code === selectedCode
    );

    if (selectedCountry) {
      setPhoneNumber("");
      setSelectedCountry(selectedCountry);

      onCountryCodeChange(selectedCountry.code);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setPhoneNumber(input);
    const isInputValid = validatePhoneNumber(input);

    if (isInputValid) {
      setIsValid("");
      onPhoneNumberChange(input);
    } else {
      setIsValid("Invalid");
    }
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const { phoneLength } = selectedCountry;

    if (phoneNumber === "" || phoneNumber.length !== phoneLength) {
      return false;
    }

    return true;
  };

  return (
    <div className="flex">
      <select
        className="flex-shrink-0 h-full bg-transparent  pl-2 py-2 appearance-none rounded-lg border-2 border-gray-300"
        onChange={handleCountryChange}
        value={selectedCountry.code}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.code} +{country.phone}
          </option>
        ))}
      </select>
      <input
        className="flex-grow block rounded-lg border-2 border-gray-300 py-2 px-4 placeholder:text-gray-400 text-sm leading-6 focus:outline-none focus:border-blue-500"
        type="tel"
        placeholder={`Enter phone number`}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        maxLength={selectedCountry.phoneLength}
      />
    </div>
  );
}
