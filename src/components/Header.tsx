import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <IonHeader>
      <IonToolbar className="backdrop-blur-sm bg-blue/500">
        <IonTitle className="font-bold">Cat Breeds Application</IonTitle>
        {isAuthenticated && (
          <IonButtons slot="end">
            <IonButton onClick={logout} className="font-semibold">
              Logout
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
}
