import { register } from 'swiper/element/bundle';
register()


import { Header } from '../../components/Header'
import { Section } from '../../components/Section'
import { Footer } from '../../components/Footer'
import { Card } from '../../components/Card'

import homeBanner from '../../assets/home-banner.png';
import passionFruit from '../../assets/passionFruit.png';
import sweet from '../../assets/sweet.png';

import { Container, Content, TopBox } from './styles'

export function Home() {

  const Foods = [{
    id: '1',
    image: sweet,
    name: 'Spaguetti Gambe',
    description: 'Massa fresca com camarões e pesto.',
    value: '79,97'
  },
  {
    id: '2',
    image: passionFruit,
    name: 'Suco de maracujá',
    description: 'Suco de maracujá gelado, cremoso, docinho.',
    value: '13,97'
  },
  {
    id: '3',
    image: sweet,
    name: 'Peachy pastrie',
    description: 'Delicioso folheado de pêssego com folhas de hortelã.',
    value: '32,97'
  },
  {
    id: '4',
    image: passionFruit,
    name: 'Spaguetti Gambe',
    description: 'Massa fresca com camarões e pesto.',
    value: '79,97'
  },
  {
    id: '5',
    image: sweet,
    name: 'Suco de maracujá',
    description: 'Suco de maracujá gelado, cremoso, docinho.',
    value: '13,97'
  },
  {
    id: '6',
    image: passionFruit,
    name: 'Peachy pastrie',
    description: 'Delicioso folheado de pêssego com folhas de hortelã.',
    value: '32,97'
  }
  ];

  const Desserts = [{
    id: '1',
    image: sweet,
    name: 'Spaguetti Gambe',
    description: 'Massa fresca com camarões e pesto.',
    value: '79,97'
  },
  {
    id: '2',
    image: passionFruit,
    name: 'Suco de maracujá',
    description: 'Suco de maracujá gelado, cremoso, docinho.',
    value: '13,97'
  },
  {
    id: '3',
    image: sweet,
    name: 'Peachy pastrie',
    description: 'Delicioso folheado de pêssego com folhas de hortelã.',
    value: '32,97'
  },
  {
    id: '4',
    image: passionFruit,
    name: 'Spaguetti Gambe',
    description: 'Massa fresca com camarões e pesto.',
    value: '79,97'
  },
  {
    id: '5',
    image: sweet,
    name: 'Suco de maracujá',
    description: 'Suco de maracujá gelado, cremoso, docinho.',
    value: '13,97'
  },
  {
    id: '6',
    image: sweet,
    name: 'Peachy pastrie',
    description: 'Delicioso folheado de pêssego com folhas de hortelã.',
    value: '32,97'
  }
  ];

  const Beverages = [{
    id: '1',
    image: sweet,
    name: 'Spaguetti Gambe',
    description: 'Massa fresca com camarões e pesto.',
    value: '79,97'
  },
  {
    id: '2',
    image: passionFruit,
    name: 'Suco de maracujá',
    description: 'Suco de maracujá gelado, cremoso, docinho.',
    value: '13,97'
  },
  {
    id: '3',
    image: sweet,
    name: 'Peachy pastrie',
    description: 'Delicioso folheado de pêssego com folhas de hortelã.',
    value: '32,97'
  },
  {
    id: '4',
    image: passionFruit,
    name: 'Spaguetti Gambe',
    description: 'Massa fresca com camarões e pesto.',
    value: '79,97'
  },
  {
    id: '5',
    image: sweet,
    name: 'Suco de maracujá',
    description: 'Suco de maracujá gelado, cremoso, docinho.',
    value: '13,97'
  },
  {
    id: '6',
    image: sweet,
    name: 'Peachy pastrie',
    description: 'Delicioso folheado de pêssego com folhas de hortelã.',
    value: '32,97'
  }
  ];


  return (
    <Container>
      <Header />
      <main>
        <Content>
          <TopBox>
            <img src={homeBanner} alt="Macarons coloridos despencando juntamente com folhas verdes e frutas frescas." />
            <div>
              <h1>Sabores inigualáveis</h1>
              <span>Sinta o cuidado do preparo com ingredientes selecionados</span>
            </div>
          </TopBox>

          <Section title="Refeições">
            <swiper-container style={{color:'red'}}
              slides-per-view="5"
              navigation="true"
              loop="true"
              grab-cursor="true"
              space-between='120'
              speed="500"
            >

              {Foods.map((data) => (
                <swiper-slide key={data.id}>
                  <Card data={data} />
                </swiper-slide>
              ))}
              
            </swiper-container>
          </Section>

          <Section title="Bebidas">
            <swiper-container
              slides-per-view="5"
              navigation="true"
              loop="true"
              grab-cursor="true"
              space-between='120'
              speed="500"
            >

              {Desserts.map((data) => (
                <swiper-slide key={data.id}>
                  <Card data={data}/>
                </swiper-slide>
              ))}

            </swiper-container>
          </Section>

          <Section title="Sobremesas">
            <swiper-container
              slides-per-view="5"
              navigation="true"
              loop="true"
              grab-cursor="true"
              space-between='120'
              speed="500"
            >
              {Beverages.map((data) => (
                <swiper-slide key={data.id}>
                  <Card data={data} />
                </swiper-slide>
              ))}
            </swiper-container>
          </Section>


        </Content>
      </main>

      <Footer />

    </Container>
  );
}
