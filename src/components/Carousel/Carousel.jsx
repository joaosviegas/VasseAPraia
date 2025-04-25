// BeachCarousel.jsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Carousel.css';

// Sample data organized by concelho
const BEACHES_BY_CONCELHO = {
  'Funchal': [
    {
      id: 'praia-formosa',
      title: 'Praia Formosa',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'A maior praia da Madeira, com calhau e areia preta, ideal para um mergulho rápido ou para um passeio na promenade que conecta o Funchal a Câmara de Lobos.',
      image: '/src/assets/images/praia-formosa-1-digitaltravelcouple.jpg',
      icon: '🏖️',
    },
    {
      id: 'docas-cavacas',
      title: 'Docas do Cavacas',
      type: 'Piscinas naturais',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar',
      description: 'Belas piscinas naturais formadas por rochas vulcânicas com acesso direto ao mar.',
      image: '/src/assets/images/madeira_mar_019-andre-carvalho.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-paneleiros',
      title: 'Poça do Governador',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'none',
      description: 'Também conhecida como Praia dos Paneleiros, é uma enseada secreta e de difícil acesso, mas com piscina natural e águas límpidas.',
      image: 'src/assets/images/FUN2746.jpg',
      icon: '🏝️',
    },
    {
      id: 'ponta-gorda',
      title: 'Ponta Gorda',
      type: 'Complexo balnear',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar',
      description: 'Complexo moderno com escadas de acesso ao mar, ideal para banho e lazer.',
      image: 'src/assets/images/_nbr9810.jpg',
      icon: '🏖️',
    },
    {
      id: 'clube-naval',
      title: 'Clube Naval do Funchal',
      type: 'Complexo balnear, Piscinas, Acesso ao mar',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar',
      description: 'Piscinas com acesso ao mar e diversas atividades aquáticas para sócios e visitantes.',
      image: 'src/assets/images/clubenavaldofunchal_cover.jpeg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-gorgulho',
      title: 'Praia do Gorgulho (Gavinas)',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'shower, lifeguard',
      description: 'Pequena praia de calhau, pouco movimentada e ideal para relaxar ao som das ondas.',
      image: 'src/assets/images/funchal_jardinsdolido1.jpg',
      icon: '🏖️',
    },
    {
      id: 'lido-velho',
      title: 'Lido Velho',
      type: 'Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard, parking',
      description: 'Antigo complexo de piscinas naturais com vista para o oceano e serviços de bar.',
      image: 'src/assets/images/shutterstock_364027538_ComplexoBalnearLidoFunchal_MD_Anna Lurye_660x371.jpg',
      icon: '🏖️',
    },
    {
      id: 'lido',
      title: 'Lido',
      type: 'Complexo balnear, Piscinas, Acesso ao mar',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Moderno complexo de lazer com piscinas, acesso ao mar e infraestruturas para toda a família.',
      image: 'src/assets/images/lido-miguelmoniz.jpg',
      icon: '🏖️',
    },
    {
      id: 'clube-de-turismo',
      title: 'Clube de Turismo',
      type: 'Piscinas',
      price: 'Pago',
      facilities: 'bar, restaurant, pool, wc',
      description: 'Piscinas em ambiente privado, com serviços de bar e restauração para sócios.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-secreta',
      title: 'Praia Secreta',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'boat',
      description: 'Enseada isolada e de difícil acesso, perfeita para quem procura tranquilidade total.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'praia-nova',
      title: 'Praia do Almirante Reis (Praia Nova)',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'shower',
      description: 'Localizada no centro do Funchal, esta praia de calhau está perto de cafés e esplanadas.',
      image: 'src/assets/images/praia-do-almirante-reis.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-sao-tiago',
      title: 'Praia de S. Tiago (Arsenal)',
      type: 'Praia de Calhau, Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar',
      description: 'Também chamada Arsenal, combina restaurante de peixe fresco com acesso direto ao mar.',
      image: 'src/assets/images/dsc_8704.jpg',
      icon: '🏖️',
    },
    {
      id: 'barreirinha',
      title: 'Barreirinha',
      type: 'Complexo balnear, Praia de Calhau, Acesso ao mar',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar',
      description: 'Pequena praia urbana, muito familiar, com correntes suaves e serviços de bar.',
      image: 'src/assets/images/complexo-balnear-da-barreirinha0003-francisco-correia.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-touco',
      title: 'Praia do Touco',
      type: 'Praia escondida, Praia de Calhau',
      price: 'Grátis',
      facilities: 'shower',
      description: 'Praia secreta com acesso por trilho e águas cristalinas, ideal para aventureiros.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'lazareto',
      title: 'Lazareto',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Enseada preservada com acesso complicado, frequente por quem busca sossego.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
  ],
  'Machico': [
  {
    id: 'acesso-mar-agua-pena',
    title: 'Acesso ao Mar de Água de Pena',
    type: 'Acesso ao mar',
    price: 'free',
    facilities: 'none',
    description: 'Pequeno acesso ao mar escondido na freguesia de Água de Pena, ideal para momentos de tranquilidade junto ao oceano.',
    image: '/api/placeholder/600/300',
    icon: '🌊',
  },
  {
    id: 'praia-machico',
    title: 'Praia de Machico',
    type: 'Praia de Areia',
    price: 'free',
    facilities: 'bar, wc, lifeguard, restaurantes',
    description: 'Uma das poucas praias de areia dourada na Madeira, com águas calmas e vista para a marina.',
    image: '/api/placeholder/600/300',
    icon: '🏖️',
  },
  {
    id: 'praia-banda-alem',
    title: 'Praia da Banda d’Além',
    type: 'Praia de Areia',
    price: 'free',
    facilities: 'bar, wc, guarda-sóis',
    description: 'Praia de areia dourada localizada na baía de Machico, com diversas infraestruturas de apoio.',
    image: '/api/placeholder/600/300',
    icon: '🏖️',
  },
  {
    id: 'praia-sao-roque',
    title: 'Praia de São Roque',
    type: 'Praia de Calhau',
    price: 'free',
    facilities: 'bar, wc',
    description: 'Praia de calhau rolado situada na baía de Machico, equipada com diversas infraestruturas de apoio.',
    image: '/api/placeholder/600/300',
    icon: '🏖️',
  },
  {
    id: 'praia-ribeira-natal',
    title: 'Praia da Ribeira do Natal',
    type: 'Praia de Calhau',
    price: 'free',
    facilities: 'bar, wc',
    description: 'Praia de calhau acompanhada pela promenade do Caniçal, com várias infraestruturas de apoio e uma beleza natural inegável.',
    image: '/api/placeholder/600/300',
    icon: '🏖️',
  },
  {
    id: 'complexo-balnear-canical',
    title: 'Complexo Balnear do Caniçal',
    type: 'Piscinas naturais',
    price: 'paid',
    facilities: 'piscinas, bar, wc, acesso ao mar',
    description: 'Complexo com duas piscinas de água salgada, diversas infraestruturas de apoio e acesso ao mar.',
    image: '/api/placeholder/600/300',
    icon: '🏊',
  },
  {
    id: 'praia-pedradeira',
    title: 'Praia da Pedradeira',
    type: 'Praia de Calhau',
    price: 'free',
    facilities: 'nenhuma',
    description: 'Pequena praia de calhau localizada no Caniçal, ideal para quem procura tranquilidade e contacto com a natureza.',
    image: '/api/placeholder/600/300',
    icon: '🌊',
  },
  {
    id: 'praia-quinta-lorde',
    title: 'Praia da Quinta do Lorde',
    type: 'Praia de Calhau',
    price: 'paid',
    facilities: 'bar, wc, acesso privado',
    description: 'Praia privada pertencente ao resort Quinta do Lorde, oferecendo acesso exclusivo a hóspedes e visitantes da marina.',
    image: '/api/placeholder/600/300',
    icon: '🏖️',
  },
  {
    id: 'prainha-canical',
    title: 'Prainha do Caniçal',
    type: 'Praia de Areia Natural',
    price: 'free',
    facilities: 'bar, wc',
    description: 'Praia de areia natural acobreada, escondida entre as dunas da Piedade, próxima da Ponta de São Lourenço.',
    image: '/api/placeholder/600/300',
    icon: '🏖️',
  },
  {
    id: 'cais-sardinha',
    title: 'Praia do Cais do Sardinha',
    type: 'Praia de Calhau',
    price: 'free',
    facilities: 'nenhuma',
    description: 'Pequena praia isolada situada no final da Vereda da Ponta de São Lourenço, ideal para um mergulho após uma caminhada.',
    image: '/api/placeholder/600/300',
    icon: '🚶‍♂️',
  },
  {
    id: 'praia-maiata',
    title: 'Praia da Maiata',
    type: 'Praia de Areia e Calhau',
    price: 'free',
    facilities: 'bar, wc',
    description: 'Praia conhecida pela excelência das suas ondas, sendo um dos locais preferidos dos surfistas na costa nordeste da Madeira.',
    image: '/api/placeholder/600/300',
    icon: '🏄',
  },
  {
    id: 'complexo-balnear-porto-cruz',
    title: 'Complexo Balnear do Porto da Cruz',
    type: 'Piscinas naturais',
    price: 'paid',
    facilities: 'piscinas, bar, wc',
    description: 'Complexo com duas piscinas e múltiplas infraestruturas de apoio, situado no Passeio Marítimo de Porto da Cruz.',
    image: '/api/placeholder/600/300',
    icon: '🏊',
  },
  {
    id: 'praia-alagoa',
    title: 'Praia da Alagoa',
    type: 'Praia de Areia Preta',
    price: 'free',
    facilities: 'bar, wc',
    description: 'Praia de areia preta localizada na freguesia de Porto da Cruz, destacando-se pela montanha que se ergue sobre o mar.',
    image: '/api/placeholder/600/300',
    icon: '🏖️',
  },
],
  'Santa Cruz': [
    {
      id: 'praia-do-garajau',
      title: 'Praia do Garajau',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'bar, wc, teleférico, centro de mergulho',
      description: 'Praia de calhau localizada na Reserva Natural Parcial do Garajau, popular entre mergulhadores e snorkelers devido às águas cristalinas e biodiversidade marinha.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'lido-galomar',
      title: 'Lido Galomar',
      type: 'Complexo balnear',
      price: 'Pago',
      facilities: 'piscina de água salgada, piscina infantil, centro de mergulho, bar, wc, elevador panorâmico',
      description: 'Complexo balnear com piscinas de água salgada, centro de mergulho e acesso direto ao mar, ideal para famílias e entusiastas de mergulho.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-reis-magos',
      title: 'Praia dos Reis Magos',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, duches, bar, vigilância',
      description: 'Praia de calhau com águas límpidas e tranquilas, galardoada com Bandeira Azul, oferecendo boas condições para banhos e mergulho.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-portinho',
      title: 'Praia do Portinho',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, duches, bar',
      description: 'Pequena praia de calhau com ambiente tranquilo, ideal para relaxar e desfrutar da paisagem costeira.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'piscinas-ribeira-boaventura',
      title: 'Piscinas da Ribeira da Boaventura',
      type: 'Complexo balnear',
      price: 'Pago',
      facilities: 'duas piscinas, solário, balneários, esplanada',
      description: 'Complexo balnear com duas piscinas e uma pequena baía protegida, muito frequentado por famílias com crianças.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'aquaparque',
      title: 'Aquaparque',
      type: 'Parque aquático',
      price: 'Pago',
      facilities: 'piscinas, escorregas, rio lento, bar, wc',
      description: 'Parque aquático com diversas piscinas, escorregas e outras atrações aquáticas, ideal para um dia divertido em família.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-de-santa-cruz',
      title: 'Praia de Santa Cruz',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, duches, bares, restaurantes',
      description: 'Praia urbana com calhau, localizada junto ao centro da cidade, oferecendo fácil acesso e diversas comodidades.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'roca-mar',
      title: 'Roca Mar',
      type: 'Complexo balnear',
      price: 'Pago',
      facilities: 'piscina, solário, acesso ao mar, bar, wc',
      description: 'Complexo balnear situado na base de uma falésia, com acesso direto ao mar e vistas panorâmicas sobre o Atlântico.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
  ],
  'Câmara de Lobos': [
    {
      id: 'praia-do-vigario',
      title: 'Praia do Vigário',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'bar, wc',
      description: 'Principal praia da cidade de Câmara de Lobos, com cerca de 400 metros de extensão, composta por calhau rolado e águas límpidas. :contentReference[oaicite:0]{index=0}',
      image: 'src/assets/images/praia-do-vigário-3_woodland-studio.jpg',
      icon: '🚣',
    },
    {
      id: 'complexo-balnear-salinas',
      title: 'Complexo Balnear das Salinas',
      type: 'Piscinas',
      price: 'Pago',
      facilities: 'piscinas para adultos e crianças, vestiários, espreguiçadeiras, chapéus-de-sol, bar de apoio',
      description: 'Complexo balnear com duas piscinas situado na bela Baía de Câmara de Lobos, oferecendo uma envolvência pitoresca. :contentReference[oaicite:1]{index=1}',
      image: 'src/assets/images/piscinas-das-salinas-2_woodland-studio.jpg',
      icon: '🏖️',
    },
    {
      id: 'faja-do-cabo-girao',
      title: 'Fajã do Cabo Girão',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'cablecar, boat',
      description: 'Pequena praia de calhau situada na base do promontório do Cabo Girão, acessível apenas por mar, oferecendo um ambiente tranquilo e vistas impressionantes.',
      image: 'src/assets/images/dsc_6465.jpg',
      icon: '🏝️',
    },
  ],
  'Ribeira Brava': [
    {
      id: 'praia-ribeira-brava',
      title: 'Praia da Ribeira Brava',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'bar, wc, lifeguard, parking',
      description: 'Praia urbana de calhau, com boas infraestruturas e águas protegidas por molhes, ideal para famílias.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-da-tabua',
      title: 'Praia da Tabua',
      type: 'Zona costeira',
      price: 'Grátis',
      facilities: 'passeio marítimo, ciclovia',
      description: 'Zona costeira com passeio marítimo e ciclovia, ideal para caminhadas e passeios de bicicleta ao longo do litoral. :contentReference[oaicite:0]{index=0}',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'calhau-da-lapa',
      title: 'Praia do Calhau da Lapa',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'chuveiros, aluguer de barcos/gaivotas/caiaques, aluguer de guarda-sóis/toldos/barracas',
      description: 'Praia isolada de calhau, conhecida pela sua atmosfera pacata e pela qualidade de excelência das águas. Acessível por uma vereda íngreme ou por mar.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'faja-dos-padres',
      title: 'Fajã dos Padres',
      type: 'Praia escondida',
      price: 'Pago',
      facilities: 'teleférico, restaurante, wc',
      description: 'Praia isolada acessível apenas por teleférico ou barco, conhecida pela temperatura amena e transparência das águas durante todo o ano. :contentReference[oaicite:2]{index=2}',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
  ],
  'Ponta do Sol': [
    {
      id: 'praia-ponta-sol',
      title: 'Praia da Ponta do Sol',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'bar, wc, duches, biblioteca de verão, campo desportivo, vigilância',
      description: 'Praia urbana de calhau rolado com cerca de 160 metros, situada numa enseada protegida por escarpas. Conhecida pelas suas águas límpidas e clima ameno durante todo o ano.',
      image: '/api/placeholder/600/300',
      icon: '☀️',
    },
    {
      id: 'praia-madalena-mar',
      title: 'Praia da Madalena do Mar',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'solário em deck, dois restaurantes, bar, balneários, campo de voleibol, parque infantil, estacionamento, biblioteca de verão, vigilância',
      description: 'Praia de calhau com diversas infraestruturas de apoio, ideal para famílias. Possui Bandeira Azul e é conhecida pelas suas águas calmas e ambiente acolhedor.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-faja-do-mar',
      title: 'Praia da Fajã do Mar',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'acesso por trilho ou barco',
      description: 'Pequena praia isolada de calhau, acessível por um trilho íngreme ou por mar. Ideal para quem procura tranquilidade e contacto com a natureza.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'praia-lugar-de-baixo',
      title: 'Praia do Lugar de Baixo',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'bar, restaurantes, estacionamento',
      description: 'Praia composta por calhau e areia preta, localizada numa das zonas mais quentes da ilha. Popular entre surfistas devido às suas ondas desafiantes.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-dos-anjos',
      title: 'Praia dos Anjos',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'bar de apoio, wc',
      description: 'Praia de calhau e areia preta, situada entre Ponta do Sol e Madalena do Mar. Oferece uma vista privilegiada para o pôr do sol e é acessível pela ER101.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'praia-cais-do-tunel',
      title: 'Praia do Cais do Túnel',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'restaurante nas proximidades',
      description: 'Pequena praia localizada junto ao histórico Cais da Ponta do Sol, inaugurado em 1849. Ideal para apreciar o pôr do sol e desfrutar de um ambiente tranquilo.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
  ],
  'Calheta': [
    {
      id: 'praia-da-calheta',
      title: 'Praia da Calheta',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'bar, restaurante, wc, vigilância, aluguer de espreguiçadeiras',
      description: 'Praia artificial de areia dourada, protegida por molhes, ideal para famílias e banhistas.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-portinho',
      title: 'Praia do Portinho (Jardim do Mar)',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'chuveiros, estacionamento, bar/restaurante nas proximidades',
      description: 'Pequena praia de calhau, popular entre surfistas, localizada na extremidade leste do Jardim do Mar.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-paul-do-mar',
      title: 'Praia do Paul do Mar',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'chuveiros, restaurantes e bares nas proximidades',
      description: 'Praia de calhau conhecida pelas suas ondas fortes, sendo um dos principais spots de surf da Madeira.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-secreta-jardim-do-mar',
      title: 'Praia Secreta do Jardim do Mar',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Pequena praia isolada no final da promenade do Jardim do Mar, acessível apenas a pé, ideal para quem procura tranquilidade.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'praia-do-cais-paul-do-mar',
      title: 'Praia do Cais (Paul do Mar)',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'chuveiros, estacionamento, restaurantes e bares nas proximidades',
      description: 'Pequena praia de calhau junto ao cais de Paul do Mar, popular entre locais e visitantes.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
  ],
  'Porto Moniz': [
    {
      id: 'piscinas-naturais',
      title: 'Piscinas Naturais do Porto Moniz',
      type: 'Piscinas naturais',
      price: 'Pago',
      facilities: 'bar, wc, balneários, vigilância',
      description: 'Famosas piscinas naturais vulcânicas com vistas deslumbrantes do Atlântico.',
      image: '/api/placeholder/600/300',
      icon: '🌋',
    },
    {
      id: 'piscinas-naturais-velhas',
      title: 'Piscinas Naturais Velhas',
      type: 'Piscinas naturais',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Piscinas naturais mais rústicas, sem infraestruturas, ideais para quem procura uma experiência mais natural.',
      image: '/api/placeholder/600/300',
      icon: '🌋',
    },
    {
      id: 'ribeira-da-janela',
      title: 'Praia da Ribeira da Janela',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, duches, solário',
      description: 'Praia de calhau situada na foz da Ribeira da Janela, com paisagens impressionantes e boas condições para surf.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'piscinas-naturais-do-seixal',
      title: 'Piscinas Naturais do Seixal (Poças das Lesmas)',
      type: 'Piscinas naturais',
      price: 'Grátis',
      facilities: 'bar, wc, duches',
      description: 'Piscinas naturais formadas por rochas vulcânicas, oferecendo um ambiente tranquilo e paisagens únicas.',
      image: '/api/placeholder/600/300',
      icon: '🌋',
    },
    {
      id: 'praia-do-seixal',
      title: 'Praia do Seixal',
      type: 'Praia de Areia Preta',
      price: 'Grátis',
      facilities: 'wc, duches',
      description: 'Praia de areia preta com águas cristalinas, rodeada por montanhas verdes, ideal para relaxar e praticar surf.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-da-laje',
      title: 'Praia da Laje (Jamaica)',
      type: 'Praia de Areia Preta',
      price: 'Grátis',
      facilities: 'wc, duches',
      description: 'Conhecida como "Jamaica" devido às palmeiras ao longo da promenade, esta praia oferece um cenário paradisíaco e tranquilo.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
  ],
  'São Vicente': [
    {
      id: 'piscinas-do-calamar',
      title: 'Piscinas do Calamar',
      type: 'Piscina, Piscina Natrural',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Praia de calhau com águas claras, popular entre surfistas, mas sem vigilância ou infraestruturas de apoio.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-faja-da-areia',
      title: 'Praia da Fajã da Areia',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'bar, solário',
      description: 'Praia de calhau protegida por um quebra-mar, ideal para desportos náuticos como surf e bodyboard.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'complexo-balnear-ponta-delgada',
      title: 'Complexo Balnear da Ponta Delgada',
      type: 'Complexo balnear',
      price: 'Pago',
      facilities: 'piscinas de água salgada, solário, esplanada, balneários, estacionamento, praia protegida',
      description: 'Complexo com duas piscinas de água salgada, área de solário, esplanada, balneários, estacionamento e uma praia numa baía protegida.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
  ],
  'Santana': [
    {
      id: 'praia-rocha-navio',
      title: 'Praia da Rocha do Navio',
      type: 'Reserva natural',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Praia isolada acessível por teleférico, com piscinas naturais e paisagem deslumbrante.',
      image: '/api/placeholder/600/300',
      icon: '🚡',
    },
    {
      id: 'praia-do-faial',
      title: 'Praia do Faial',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, balneários, restaurante, snack-bar, piscina infantil, parque infantil, campos de jogos, estacionamento',
      description: 'Praia tranquila com calhau, protegida por uma parede de rochas, ideal para famílias.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'faja-do-mar-do-faial',
      title: 'Fajã do Mar do Faial',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Pequena e paradisíaca praia de calhau, acessível por trilhos, perfeita para quem busca tranquilidade.',
      image: '/api/placeholder/600/300',
      icon: '🏝️',
    },
    {
      id: 'faja-da-rocha-do-navio',
      title: 'Fajã da Rocha do Navio',
      type: 'Reserva natural',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Área protegida com fajãs agrícolas, cascatas e acesso por teleférico ou trilho.',
      image: '/api/placeholder/600/300',
      icon: '🚡',
    },
    {
      id: 'complexo-calhau-sao-jorge',
      title: 'Complexo Balnear do Calhau de São Jorge',
      type: 'Complexo balnear',
      price: 'Pago',
      facilities: 'bar, restaurante, wc, duches, balneários, piscinas, lagoa de água doce',
      description: 'Complexo com três piscinas, lagoa natural e acesso ao mar (não recomendado para banhistas).',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
  ],
  'Porto Santo': [
    {
      id: 'praia-do-penedo',
      title: 'Praia Atrás do Porto',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'bar, wc, duches',
      description: 'Pequena extensão de areia junto ao porto de Porto Santo, ideal para um mergulho rápido após a chegada.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-pato-bravo',
      title: 'Praia do Pato Bravo',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, duches',
      description: 'Zona de calhau e areia junto ao porto de pesca, com vista para o mar aberto.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-da-fontinha',
      title: 'Praia da Fontinha (Vila Baleira)',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'bar, wc, restaurantes, aluguer de espreguiçadeiras',
      description: 'Praia principal da ilha, com grande extensão de areia e várias infraestruturas.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-ribeiro-salgado',
      title: 'Praia do Ribeiro Salgado',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'estacionamento',
      description: 'Zona balnear tranquila, ideal para relaxar e desfrutar do mar calmo.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-das-pedras-pretas',
      title: 'Praia das Pedras Pretas',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Praia de seixos escuros, oferecendo um contraste interessante com a areia dourada.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-cabeco-da-ponta',
      title: 'Praia do Cabeço da Ponta',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'restaurantes, bares',
      description: 'Praia de areia terapêutica, frequentada por quem busca as propriedades terapêuticas da areia.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-zimbralinho',
      title: 'Praia do Zimbralinho',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Pequena enseada de calhau, perfeita para quem procura tranquilidade.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-da-ponta-da-calheta',
      title: 'Praia da Ponta da Calheta',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'wc, duches, estacionamento',
      description: 'Praia de areia clara na ponta oeste da ilha, com formações rochosas e vista para o Ilhéu da Cal.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-das-salemas',
      title: 'Praia das Salemas',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Praia de calhau com piscinas naturais formadas entre as rochas.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-furado-norte',
      title: 'Praia do Furado Norte',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Praia isolada acessível apenas por trilho, ideal para quem procura privacidade.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-ponta-norte',
      title: 'Praia do Ponta Norte',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Praia no extremo norte da ilha, menos frequentada e com belas vistas panorâmicas.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
    {
      id: 'praia-do-porto-dos-frades',
      title: 'Praia do Porto dos Frades',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'nenhuma',
      description: 'Pequena praia de calhau junto ao antigo porto de pesca dos Frades, com ambiente tranquilo e vistas para o mar.',
      image: '/api/placeholder/600/300',
      icon: '🏖️',
    },
  ],
};

const getFacilityIcons = (facilities) => {
  const facilityIcons = {
    wc: 'fa-solid fa-restroom', // Restroom icon
    lifeguard: 'fa-solid fa-life-ring', // Lifeguard icon
    parking: 'fa-solid fa-square-parking', // Parking icon
    food: 'fa-solid fa-utensils', // Food icon
    bar: 'fa-solid fa-cocktail', // Bar icon
    shower: 'fa-solid fa-shower', // Shower icon
    cablecar: 'fa-solid fa-cable-car', // Cable car icon
    boat: 'fa-solid fa-ship', // Boat icon
    none: 'fa-solid fa-ban', // No facilities icon
  };

  return facilities
    .split(',') // Split the string by commas
    .map((facility) => facility.trim()) // Trim whitespace
    .map((facility) => facilityIcons[facility] || '') // Map to FontAwesome classes, fallback to empty string
    .filter((icon) => icon !== ''); // Remove empty strings
};

const Carousel = ({ selectedConcelho = 'Funchal' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    const selectedBeaches = BEACHES_BY_CONCELHO[selectedConcelho] || [];
    setBeaches(selectedBeaches);
    setCurrentIndex(0);
  }, [selectedConcelho]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, beaches.length - 1));
  };


  // Early return if no beaches available
  if (beaches.length === 0) {
    return <div className="no-beaches">Não foram encontradas praias em {selectedConcelho}</div>;
  }

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === beaches.length - 1;

  return (
    <div className="beach-carousel-container">
      
      <div className="carousel-navigation">
        <button 
          className={`carousel-arrow prev ${isAtStart ? 'disabled' : ''}`}
          onClick={handlePrevious}
          disabled={isAtStart}
        >
          <ChevronLeft size={32} />
        </button>
        
        <div className="beach-carousel-track-container">
          <div 
            className="beach-carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 60}%)` }}
          >
            {beaches.map((beach, index) => (
              <div 
                key={beach.id} 
                className={`beach-carousel-item ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="beach-image">
                  <img src={beach.image} alt={beach.title} />
                </div>
                <div className="beach-content">
                  <div className="beach-header">
                    <div className="beach-icon">{beach.icon}</div>
                    <div className="beach-title-container">
                      <h3 className="beach-title">{beach.title}</h3>
                      <div className="beach-type">{beach.type}</div>
                    </div>
                  </div>
                  
                  <div className="beach-details">
                    {beach.price && (
                      <div className="beach-detail">
                        <i className="fa-solid fa-euro-sign" ></i>
                        <span className="detail-text">{beach.price}</span>
                      </div>
                    )}
                    <div className="beach-detail">
                      {/* Dynamically render FontAwesome icons based on facilities */}
                      {getFacilityIcons(beach.facilities).map((iconClass, idx) => (
                        <i key={idx} className={`detail-icon ${iconClass}`}></i>
                      ))}
                    </div>
                  </div>
                  
                  <div className="beach-description">{beach.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`carousel-arrow next ${isAtEnd ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={isAtEnd}
        >
          <ChevronRight size={32} />
        </button>
      </div>
      
      <div className="carousel-dots">
        {beaches.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;