export default [
  {
    name: "category",
    options: [
      "01 - Health Care Worker",
      "02 - Senior Citizen", 
      "03 - Indigent",
      "04 - Uniformed Personnel",
      "05 - Essential Worker",
      "06 - Other",
    ],
    type: "String",
    format: "Dropdown",
  },
  {
    name: "categoryID",
    displayName: "Category ID",
    type: "String",
    format: "Text",
  },
  {
    name: "philHealthID",
    displayName: "Philhealth ID",
    type: "Number",
    format: "Text",
    limit: 12,
  },
  {
    name: "lastName",
    displayName: "Last Name",
    type: "String",
    format: "Text",
  },
  {
    name: "firstName",
    displayName: "First Name",
    type: "String",
    format: "Text",
  },
  {
    name: "middleName",
    displayName: "Middle Name",
    type: "String",
    format: "Text",
  },
  {
    name: "suffix",
    type: "String",
    format: "Text",
  },
  {
    name: "contactNumber",
    displayName: "Contact Number",
    type: "Number",
    format: "Text",
    limit: 12,
  },
  {
    name: "fullAddress",
    displayName: "Full Address",
    type: "String",
    format: "Text",
  },
  {
    name: "province",
    type: "String",
    format: "Text",
  },
  {
    name: "municipalityOrCity",
    displayName: "Municipality or City",
    type: "String",
    format: "Text",
  },
  {
    name: "barangay",
    type: "String",
    format: "Text",
  },
  {
    name: "sex",
    options: [
      "01 - Female",
      "02 - Male",
      "03 - Not To Disclose",
    ],
    type: "String",
    format: "Dropdown",
  },
  {
    name: "dateOfBirth",
    displayName: "Date of Birth",
    type: "Date",
    format: "DatePicker",
  },
  {
    name: "civilStatus",
    displayName: "Civil Status",
    options: [
      "01 - Single",
      "02 - Married",
      "03 - Widow/Widower",
      "04 - Separated/Annulled",
      "05 - Living with Partner",
    ],
    type: "String",
    format: "Dropdown",
  },
  {
    name: "employed",
    options: [
      "01 - Government Employed",
      "02 - Private Employed",
      "03 - Self Employed",
      "04 - Private Practitioner",
      "05 - Others",
    ],
    type: "String",
    format: "Dropdown",
  },
  {
    name: "profession",
    options: [
      "01 - Dental Hygienist",
      "02 - Dental Technologist",
      "03 - Dentist",
      "04 - Medical Technologist",
      "05 - Midwife",
      "06 - Nurse",
      "07 - Nutritionist/Dietician",
      "08 - Occupational Therapist",
      "09 - Optomerist",
      "10 - Pharmacist",
      "11 - Physical Therapist",
      "12 - Physician",
      "13 - Radiologic Technologist",
      "14 - Respiratory Therapist",
      "15 - X-ray Technologist",
      "16 - Barangay Health Worker",
      "17 - Maintenance Staff",
      "18 - Administrative Staff",
      "19 - Other Workers in Frontline Health Services",
    ],
    type: "String",
    format: "Dropdown",
  },
  {
    name: "otherProfession",
    displayName: "Please specify profession:",
    type: "String",
    format: "Text",
    conditionalFunction(data) {
      return data["Profession"] == "19 - Other Workers in Frontline Health Services";
    }
  },
  {
    name: "directCOVID",
    displayName: "Providing direct COVID care?",
    type: "Boolean",
    format: "Dropdown",
  },
  {
    name: "employerName",
    displayName: "Employer Name",
    type: "String",
    format: "Text",
  },
  {
    name: "employerLGU",
    displayName: "Employer LGU",
    type: "String",
    format: "Text",
  },
  {
    name: "employerAddress",
    displayName: "Employer Address",
    type: "String",
    format: "Text",
  },
  {
    name: "employerContactNumber",
    displayName: "Employer Contact Number",
    type: "Number",
    format: "Text",
    limit: 12,
  },
  {
    name: "pregnancyStatus",
    displayName: "Pregnancy Status",
    type: "Boolean",
    format: "Dropdown",
    conditionalFunction: (data) => {
      return data["Sex"] == "01 - Female";
    }
  },
  {
    name: "withAllergy",
    displayName: "With Allergy?",
    type: "Boolean",
    format: "Dropdown",
  },
  {
    name: "allergy",
    type: "String",
    format: "Text",
    conditionalFunction: (data) => {
      return data["WithAllergy"] == "yes";
    }
  },
  {
    name: "withComorbidities",
    displayName: "With Comorbidities?",
    type: "Boolean",
    format: "Dropdown",
  },
  {
    name: "comorbidity",
    type: "String",
    options: [
      "01 - Hypertension",
      "02 - Heart Disease",
      "03 - Kidney Disease",
      "04 - Diabetes Mellitus",
      "05 - Bronchial Asthma",
      "06 - Immunodeficiency State",
      "07 - Cancer",
      "08 - Others",
    ],
    format: "Dropdown",
    conditionalFunction: (data) => {
      return data["WithComorbidities"] == "yes";
    }
  },
  {
    name: "covidHistory",
    displayName: "Patient diagnosed with COVID-19?",
    type: "Boolean",
    format: "Dropdown",
  },
  {
    name: "covidDate",
    displayName: "Date of first positive result / specimen collection",
    type: "Date",
    format: "DatePicker",
  },
  {
    name: "covidClassification",
    displayName: "Classification of Infection",
    type: "String",
    options: [
      "01 - Asymptomatic",
      "02 - Mild",
      "03 - Moderate",
      "04 - Severe",
      "05 - Critical",
    ],
    format: "Dropdown",
  },
  {
    name: "consentForDataCollection",
    displayName: "Provided electronic informed consent for data collection?",
    type: "String",
    options: [
      "01 - Yes",
      "02 - No",
      "03 - Unknown",
    ],
    format: "Dropdown",
  },
  {
    name: "consentForVaccination",
    displayName: "Provided initial consent for vaccination?",
    type: "String",
    options: [
      "01 - Yes",
      "02 - No",
      "03 - Unknown",
    ],
    format: "Dropdown",
  },
] as {
  name: string;
  displayName: string;
  type: string;
  options: string[];
  format: string;
  limit?: number;
  conditionalFunction?(data: Record<string,any>): boolean;
}[];