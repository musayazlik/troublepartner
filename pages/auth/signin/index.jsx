import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="bg-slate-500 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center text-teal-500">
            Sign In
          </h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email alanı boş bırakılamaz";
            }
            if (!values.password) {
              errors.password = "Şifre alanı boş bırakılamaz";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold "
                >
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className=" py-2 border-2  w-full px-2  border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold"
                >
                  Şifre:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="py-2 border-2  w-full px-2  border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Sign In"}
              </button>
              <ErrorMessage
                name="submit"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </Form>
          )}
        </Formik>

        <div className="flex justify-center items-center space-x-2">
          <button onClick={() => signIn("google")}>Google</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
