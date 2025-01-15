import { useState } from 'react';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    login(email, password);
  };

  return (
    <IonContent className="hero-pattern">
      <div className="relative flex min-h-screen items-center justify-center">
        <IonCard className="w-full max-w-xs backdrop-blur-sm bg-white/80">
          <IonCardHeader>
            <IonCardTitle className="text-2xl font-bold text-center">
              Welcome to Cat Breeds
            </IonCardTitle>
            <p className="text-center mt-2 text-gray-600">
              Discover the wonderful world of cats
            </p>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <IonItem className="bg-transparent">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value || '')}
                  required
                />
              </IonItem>

              <IonItem className="bg-transparent">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value || '')}
                  required
                />
              </IonItem>

              {error && (
                <IonText color="danger" className="text-sm">
                  <p className="mt-1">{error}</p>
                </IonText>
              )}

              <IonButton expand="block" type="submit" className="mt-6">
                Login
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  );
}
