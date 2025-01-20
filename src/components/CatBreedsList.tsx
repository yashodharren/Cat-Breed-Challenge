import { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonBadge,
  IonButton,
  IonIcon,
  IonSpinner,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonText
} from '@ionic/react';
import { chevronBack, chevronForward, searchOutline, pawOutline } from 'ionicons/icons';

interface CatBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

function CatBreedsList() {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://catfact.ninja/breeds?limit=100');
      const data = await response.json();
      setBreeds(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cat breeds:', error);
      setLoading(false);
    }
  };

  const filteredBreeds = breeds.filter(breed =>
    breed.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBreeds = filteredBreeds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBreeds.length / itemsPerPage);

  return (
    <IonContent>
      {/* Featured Cats Section */}
      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Cat Breeds</h2>
          <IonGrid>
            <IonRow>
              {[
                {
                  image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=800&h=600',
                  breed: 'Persian',
                  description: 'Known for their long fur and calm personality'
                },
                {
                  image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800&h=600',
                  breed: 'Siamese',
                  description: 'Distinctive markings and vocal personality'
                },
                {
                  image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&q=80&w=800&h=600',
                  breed: 'Maine Coon',
                  description: 'Large, gentle giants with luxurious fur'
                }
              ].map((cat, index) => (
                <IonCol size="12" sizeMd="4" key={index}>
                  <IonCard className="h-full">
                    <div className="relative h-[300px] overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.breed}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle className="text-xl font-bold">{cat.breed}</IonCardTitle>
                      <p className="mt-2 text-gray-600">{cat.description}</p>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </div>

      {/* Search and Results Section */}
      <div id="search-section" className="cat-pattern">
        <div className="relative ion-padding">
          <IonCard className="backdrop-blur-sm bg-white/95">
            <IonCardHeader>
              <div className="flex items-center justify-center gap-2 mb-4">
                <IonIcon icon={pawOutline} className="text-2xl text-primary" />
                <IonCardTitle className="text-2xl font-bold text-center">Cat Breeds Directory</IonCardTitle>
              </div>
              <p className="text-center mt-2 text-gray-600">Find detailed information about different cat breeds</p>
            </IonCardHeader>

            <div className="ion-padding">
              <IonGrid>
                <IonRow className="ion-align-items-center">
                  <IonCol size="12" sizeMd="8">
                    <IonSearchbar
                      value={searchTerm}
                      onIonInput={e => setSearchTerm(e.detail.value!)}
                      placeholder="Search breeds..."
                      className="ion-no-padding"
                    />
                  </IonCol>
                  <IonCol size="12" sizeMd="4">
                    <IonItem>
                      <IonLabel>Items per page</IonLabel>
                      <IonSelect
                        value={itemsPerPage}
                        onIonChange={e => {
                          setItemsPerPage(e.detail.value);
                          setCurrentPage(1);
                        }}
                      >
                        <IonSelectOption value={5}>5</IonSelectOption>
                        <IonSelectOption value={10}>10</IonSelectOption>
                        <IonSelectOption value={20}>20</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>

                {loading ? (
                  <IonRow>
                    <IonCol className="ion-text-center">
                      <IonSpinner />
                      <p>Loading breeds...</p>
                    </IonCol>
                  </IonRow>
                ) : (
                  <>
                    <IonRow className="ion-hide-md-down ion-margin-top font-semibold">
                      <IonCol>Breed</IonCol>
                      <IonCol>Country</IonCol>
                      <IonCol>Origin</IonCol>
                      <IonCol>Coat</IonCol>
                      <IonCol>Pattern</IonCol>
                    </IonRow>

                    {currentBreeds.map((breed, index) => (
                      <IonRow key={index} className="ion-align-items-center ion-margin-top hover:bg-gray-50 rounded-lg p-2">
                        <IonCol>
                          <strong className="ion-hide-md-up">Breed: </strong>
                          {breed.breed}
                        </IonCol>
                        <IonCol>
                          <strong className="ion-hide-md-up">Country: </strong>
                          {breed.country}
                        </IonCol>
                        <IonCol>
                          <strong className="ion-hide-md-up">Origin: </strong>
                          {breed.origin}
                        </IonCol>
                        <IonCol>
                          <strong className="ion-hide-md-up">Coat: </strong>
                          <IonBadge color="primary">{breed.coat}</IonBadge>
                        </IonCol>
                        <IonCol>
                          <strong className="ion-hide-md-up">Pattern: </strong>
                          {breed.pattern}
                        </IonCol>
                      </IonRow>
                    ))}

                    <IonRow className="ion-margin-top ion-justify-content-between ion-align-items-center">
                      <IonCol size="12" className="ion-text-center">
                        <IonButton
                          fill="clear"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <IonIcon icon={chevronBack} slot="icon-only" />
                        </IonButton>
                        <span className="ion-padding">
                          Page {currentPage} of {totalPages}
                        </span>
                        <IonButton
                          fill="clear"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          <IonIcon icon={chevronForward} slot="icon-only" />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </>
                )}
              </IonGrid>
            </div>
          </IonCard>
        </div>
      </div>
    </IonContent>
  );
}

export default CatBreedsList;
