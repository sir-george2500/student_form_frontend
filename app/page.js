"use client"
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Image from 'next/image'


const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  date_of_birth: Yup.date().required("Date of Birth is required"),
  tech_knowledge: Yup.string().required("Tech Knowledge is required"),
  select_course: Yup.string().required("Select Course is required"),
  preferred_attendance_days: Yup.string().required("Preferred Attendance Days is required"),
  email_address: Yup.string().email("Invalid email address").required("Email is required"),
  phone_number: Yup.string().matches(/^\d+$/, "Invalid phone number").required("Phone Number is required"),
  home_address: Yup.string(),
});

const initialValues = {
  first_name: "",
  last_name: "",
  middle_name: "",
  date_of_birth: "",
  tech_knowledge: "",
  select_course: "",
  preferred_attendance_days: "",
  email_address: "",
  phone_number: "",
  home_address: "",
};

export default function Home() {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values , { resetForm }) => {
    setIsLoading(true);

    // Handle form submission here
    console.log(values);

    // http://127.0.0.1:8000/api/students

    try {
      // Make API call using fetch
      const response = await fetch("https://student-form-backend.vercel.app/api/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        // Handle the response (you can log it for now)
        console.log("API Response:", responseData);
        setSubmissionStatus("success");
        resetForm();
        // You can also perform additional actions based on the response if needed
      } else {
        // Handle error responses (status code other than 2xx)
        const errorData = await response.json();
        console.error("API Error:", errorData.detail);
        setSubmissionStatus("error");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Fetch Error:", error);
      setSubmissionStatus("error");
    } finally{
      setIsLoading(false);
    }
  };


  return (
 <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {/* Submission Status Message */}
{submissionStatus === "success"?
    <div className="flex items-center justify-center">
     <div className="flex flex-col bg-white items-center w-50 px-6 py-4 rounded-md app-shadow">
       <div className="flex items-center justify-center text-green-700 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        <p>
          Congulation! you have successfully signed up.
          <br />
          Silicon Valley Liberia will be in touch soon
        </p>
      </div>
    </div>
    </div>
     :
     <>
  <Image
  src={require('../public/images/logo.jpeg')}
  width={200}
  height={200}
  alt="Picture of the author"
  style={{ borderRadius: '20%', border: '2px solid #fff' }}
  className="mb-2"
/>
     
          <div className="
            flex flex-col
          bg-white
            items-center
            w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3
            px-6 py-2 rounded-md app-shadow mx-auto
          ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="max-w-md mx-auto">
            {submissionStatus === "error" && (
              <div className="text-red-500 text-sm mb-3">
                There was an error processing your request. Please try again later.
              </div>
            )}

            {isLoading && (
              <div className="text-blue-500 text-sm mb-3">Submitting...</div>
            )}
            <h1 className="m-5">Student Registration</h1>

            <div className="grid grid-cols-2 gap-6">
            {/* First Name */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="text"
                name="first_name"
                id="first_name"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Last Name */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="text"
                name="last_name"
                id="last_name"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:text-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

            {/* Middle Name */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="text"
                name="middle_name"
                id="middle_name"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="middle_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Middle Name (Optional)
              </label>
            </div>

            {/* Date of Birth */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="date"
                name="date_of_birth"
                id="date_of_birth"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:text-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="date_of_birth"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Date of Birth
              </label>
              <ErrorMessage
                name="date_of_birth"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Tech Knowledge */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                as="select"
                name="tech_knowledge"
                id="tech_knowledge"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:text-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              >
                <option value="" disabled selected>
                  Tech Knowledge
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Field>
              <label
                htmlFor="tech_knowledge"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tech Knowledge
              </label>
              <ErrorMessage
                name="tech_knowledge"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Select Course */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                as="select"
                name="select_course"
                id="select_course"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:text-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              >
                <option value="" disabled selected>
                  Select Course
                </option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Web Design">Web Design</option>
                <option value="Computer Basics">Computer Basics</option>
              </Field>
              <label
                htmlFor="select_course"
                className="peer
              -focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Select Course
              </label>
              <ErrorMessage
                name="select_course"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Preferred Attendance Days */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                as="select"
                name="preferred_attendance_days"
                id="preferred_attendance_days"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:text-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
              >
                <option value="" disabled selected>
                  Preferred Attendance Days
                </option>
                <option value="MWF">MWF</option>
                <option value="TTH">TTH</option>
                <option value="FS">FS</option>
              </Field>
              <label
                htmlFor="preferred_attendance_days"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Preferred Attendance Days
              </label>
              <ErrorMessage
                name="preferred_attendance_days"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email Address */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="email"
                name="email_address"
                id="email_address"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:text-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email_address"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
              <ErrorMessage
                name="email_address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="tel"
                name="phone_number"
                id="phone_number"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:text-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="phone_number"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number 
              </label>
              <ErrorMessage
                name="phone_number"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Home Address */}
            <div className="relative z-0 w-full mb-5 group">
              <Field
                type="text"
                name="home_address"
                id="home_address"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="home_address"
                className="peer-focus:font-medium
                absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Home Address
              </label>
              <ErrorMessage
                name="home_address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </Form>
       </Formik>       
    </div>
     </>
    }
    </main>
  );
}
