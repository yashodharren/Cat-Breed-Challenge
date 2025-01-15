import { IonApp, IonContent, IonPage, setupIonicReact } from '@ionic/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Login } from './components/Login';
import CatBreedsList from './components/CatBreedsList';

setupIonicReact();

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <IonPage>
      <Header />
      <IonContent>
        {isAuthenticated ? <CatBreedsList /> : <Login />}
      </IonContent>
    </IonPage>
  );
}

function App() {
  return (
    <IonApp>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </IonApp>
  );
}

export default App;