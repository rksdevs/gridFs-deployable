// import SignIn from "./Layouts/Guest";
import Routing from "./utils/Routing";
import AuthState from "./Context/Auth/AuthState";

function App() {
  return (
    <div className="App">
      <AuthState>
        <Routing />
      </AuthState>
    </div>
  );
}

export default App;
