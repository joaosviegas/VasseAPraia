// Carousel.jsx
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
      image: '/images/praia-formosa-1-digitaltravelcouple.jpg',
      icon: '🏖️',
    },
    {
      id: 'docas-cavacas',
      title: 'Docas do Cavacas',
      type: 'Piscinas naturais',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar',
      description: 'Belas piscinas naturais formadas por rochas vulcânicas com acesso direto ao mar.',
      image: '/images/madeira_mar_019-andre-carvalho.jpg',
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
      id: 'praia-secreta',
      title: 'Praia Secreta',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'boat',
      description: 'Enseada isolada e de difícil acesso, perfeita para quem procura tranquilidade total.',
      image: 'src/assets/images/RDS-EXT-45.jpg',
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
      id: 'praia-do-toco',
      title: 'Praia do Toco',
      type: 'Praia escondida, Praia de Calhau',
      price: 'Grátis',
      facilities: 'shower',
      description: 'Praia secreta com acesso por trilho e águas cristalinas, ideal para aventureiros.',
      image: 'src/assets/images/reimundo2.PNG',
      icon: '🏝️',
    },
    {
      id: 'lazareto',
      title: 'Lazareto',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'none',
      description: 'Enseada preservada com acesso complicado, frequente por quem busca sossego.',
      image: 'src/assets/images/garajau_20120131_1827669666-fill-480x480.jpg',
      icon: '🏝️',
    },
  ],
  'Machico': [
  {
    id: 'acesso-mar-agua-pena',
    title: 'Acesso ao Mar de Água de Pena',
    type: 'Acesso ao mar',
    price: 'Grátis',
    facilities: 'wc, parking, sport',
    description: 'Pequeno acesso ao mar escondido na freguesia de Água de Pena, ideal para momentos de tranquilidade junto ao oceano.',
    image: '/images/parque-desportivo-de-água-de-pena-2.jpg',
    icon: '🌊',
  },
  {
    id: 'praia-machico',
    title: 'Praia de Machico (Praia de São Roque)',
    type: 'Praia de Calhau, Acesso ao mar',
    price: 'Grátis',
    facilities: 'shower, lifeguard',
    description: 'Praia de Calhau na baia de Machico, possui cais para aceder ao mar e ondas para fazer surf.',
    image: '/images/praia-de-são-roque-2.jpg',
    icon: '🏖️',
  },
  {
    id: 'praia-banda-alem',
    title: 'Praia da Banda d’Além',
    type: 'Praia de Areia',
    price: 'Grátis',
    facilities: 'wc, shower, food, bar, lifeguard, parking, sport',
    description: 'Praia de areia dourada localizada na baía de Machico, com diversas infraestruturas de apoio.',
    image: '/images/06052022_135754_dsc01914.jpg',
    icon: '🏖️',
  },
  {
    id: 'praia-ribeira-natal',
    title: 'Praia da Ribeira Natal',
    type: 'Praia de Calhau, Acesso ao mar',
    price: 'Grátis',
    facilities: 'wc, shower, food, bar, parking',
    description: 'Praia de calhau acompanhada pela promenade do Caniçal, com várias infraestruturas de apoio e uma beleza natural inegável.',
    image: '/images/01082022_170856_dsc03180.jpg',
    icon: '🏖️',
  },
  {
    id: 'praia-pedradeira',
    title: 'Praia da Pedradeira',
    type: 'Acesso ao mar',
    price: 'Grátis',
    facilities: 'wc, shower, bar, lifeguard',
    description: 'Pequena praia de calhau localizada no Caniçal, ideal para quem procura tranquilidade e contacto com a natureza.',
    image: '/images/IMG_8831 copiar.jpg',
    icon: '🌊',
  },
  {
    id: 'complexo-balnear-canical',
    title: 'Complexo Balnear do Caniçal',
    type: 'Piscinas, Acesso ao mar',
    price: 'Pago',
    facilities: 'wc, shower, food, bar, lifeguard, parking',
    description: 'Complexo com duas piscinas de água salgada, diversas infraestruturas de apoio e acesso ao mar.',
    image: '/images/07072022_130814_dji_0202.jpg',
    icon: '🏊',
  },
  {
    id: 'praia-quinta-lorde',
    title: 'Praia da Quinta do Lorde',
    type: 'Praia de Calhau, Piscina Natural, Acesso ao mar',
    price: 'Pago',
    facilities: 'wc, shower, food, bar, lifeguard, parking',
    description: 'Praia privada pertencente ao resort Quinta do Lorde, oferecendo acesso exclusivo a hóspedes e visitantes da marina.',
    image: '/images/8e89812e4f3ace1fd79a25f1b44eb239.jpg',
    icon: '🏖️',
  },
  {
    id: 'prainha-canical',
    title: 'Prainha do Caniçal',
    type: 'Praia de Areia',
    price: 'Grátis',
    facilities: 'wc, shower, food, bar, lifeguard, parking',
    description: 'Praia de areia natural acobreada, escondida entre as dunas da Piedade, próxima da Ponta de São Lourenço.',
    image: '/images/prainha-caniçal-7.jpg',
    icon: '🏖️',
  },
  {
    id: 'cais-sardinha',
    title: 'Praia do Cais do Sardinha',
    type: 'Acesso ao mar, Praia de Calhau',
    price: 'Grátis',
    facilities: 'none',
    description: 'Pequena praia isolada situada no final da Vereda da Ponta de São Lourenço, ideal para um mergulho após uma caminhada.',
    image: '/images/cais-do-sardinha-2.jpg',
    icon: '🚶‍♂️',
  },
  {
    id: 'praia-maiata',
    title: 'Praia da Maiata',
    type: 'Praia de Areia e Calhau',
    price: 'Grátis',
    facilities: 'shower',
    description: 'Praia conhecida pela excelência das suas ondas, sendo um dos locais preferidos dos surfistas na costa nordeste da Madeira.',
    image: '/images/praia-da-maiata-4.jpg',
    icon: '🏄',
  },
  {
    id: 'complexo-balnear-porto-cruz',
    title: 'Complexo Balnear do Porto da Cruz',
    type: 'Piscinas naturais',
    price: 'Pago',
    facilities: 'wc, food, bar, lifeguard',
    description: 'Complexo com duas piscinas e múltiplas infraestruturas de apoio, situado no Passeio Marítimo de Porto da Cruz.',
    image: 'src/assets/images/11062022_161409_dji_0193.jpg',
    icon: '🏊',
  },
  {
    id: 'praia-alagoa',
    title: 'Praia da Alagoa',
    type: 'Praia de Areia Preta',
    price: 'Grátis',
    facilities: 'wc, food, bar, lifeguard',
    description: 'Praia de areia preta localizada na freguesia de Porto da Cruz, destacando-se pela montanha que se ergue sobre o mar.',
    image: '/images/praia-da-alagoa-5.jpg',
    icon: '🏖️',
  },
],
  'Santa Cruz': [
    {
      id: 'praia-do-garajau',
      title: 'Praia do Garajau',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard, food, bar, cablecar',
      description: 'Praia de calhau localizada na Reserva Natural Parcial do Garajau, popular entre mergulhadores e snorkelers devido às águas cristalinas e biodiversidade marinha.',
      image: 'src/assets/images/praia-do-garajau-1.jpg',
      icon: '🏖️',
    },
    {
      id: 'roca-mar',
      title: 'Roca Mar',
      type: 'Complexo balnear, Piscina, Acesso ao mar',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Complexo balnear situado na base de uma falésia, com acesso direto ao mar e vistas panorâmicas sobre o Atlântico.',
      image: 'src/assets/images/rocamar-lido-resort.jpg',
      icon: '🏖️',
    },
    {
      id: 'lido-galomar',
      title: 'Lido Galomar',
      type: 'Complexo balnear, Piscina, Acesso ao mar',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Complexo balnear com piscinas de água salgada, centro de mergulho e acesso direto ao mar, ideal para famílias e entusiastas de mergulho.',
      image: 'src/assets/images/galomar_drone__14072018dji_0009_0005b.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-reis-magos',
      title: 'Praia dos Reis Magos',
      type: 'Praia de Calhau, Acesso ao Mar',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Praia de calhau com águas límpidas e tranquilas, galardoada com Bandeira Azul, oferecendo boas condições para banhos e mergulho.',
      image: 'src/assets/images/praia-dos-reis-magos-2_-woodland-studio.jpg',
      icon: '🏖️',
    },
    {
      id: 'piscinas-ribeira-boaventura',
      title: 'Piscinas da Ribeira da Boaventura',
      type: 'Complexo balnear, Piscina, Acesso ao mar',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Complexo balnear com duas piscinas e uma pequena baía protegida, muito frequentado por famílias com crianças.',
      image: 'src/assets/images/santa-cruz_3-complexo-balnear-da-ribeira-da-boaventura_-woodland-studio.jpg',
      icon: '🏖️',
    },
    {
      id: 'aquaparque',
      title: 'Aquaparque',
      type: 'Parque aquático, Piscina',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Parque aquático com diversas piscinas, escorregas e outras atrações aquáticas, ideal para um dia divertido em família.',
      image: 'src/assets/images/santa-cruz-_-1-aquaparque_-woodlandland-studio.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-de-santa-cruz',
      title: 'Praia de Santa Cruz',
      type: 'Praia de Calhau, Piscina, Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Praia urbana com calhau, localizada junto ao centro da cidade, oferecendo fácil acesso e diversas comodidades.',
      image: 'src/assets/images/santa-cruz_2-praia-das-palmeiras_-woodland-studio.jpg',
      icon: '🏖️',
    },
  ],
  'Câmara de Lobos': [
    {
      id: 'praia-do-vigario',
      title: 'Praia do Vigário',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard, food, bar',
      description: 'Principal praia da cidade de Câmara de Lobos, com cerca de 400 metros de extensão, composta por calhau rolado e águas límpidas. :contentReference[oaicite:0]{index=0}',
      image: 'src/assets/images/praia-do-vigário-3_woodland-studio.jpg',
      icon: '🚣',
    },
    {
      id: 'complexo-balnear-salinas',
      title: 'Complexo Balnear das Salinas',
      type: 'Piscinas',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard',
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
      type: 'Piscinas, Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, shower,lifeguard, food, bar, parking',
      description: 'Praia urbana de calhau, com boas infraestruturas e águas protegidas por molhes, ideal para famílias.',
      image: 'src/assets/images/complexo-balnear_ribeira-brava-2_-woodland-studio.jpg',
      icon: '🏖️',
    },
    {
      id: 'calhau-da-lapa',
      title: 'Praia do Calhau da Lapa',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'wc, shower, boat',
      description: 'Praia isolada de calhau, conhecida pela sua atmosfera pacata e pela qualidade de excelência das águas. Acessível por uma vereda íngreme ou por mar.',
      image: 'src/assets/images/calau-da-lapa-2_woodland-studio.jpg',
      icon: '🏝️',
    },
    {
      id: 'faja-dos-padres',
      title: 'Fajã dos Padres',
      type: 'Praia escondida',
      price: 'Pago',
      facilities: 'wc, shower, food, bar, boat, cablecar',
      description: 'Praia isolada acessível apenas por teleférico ou barco, conhecida pela temperatura amena e transparência das águas durante todo o ano.',
      image: 'src/assets/images/fajã-dos-padres-drone-madeira-digitaltravelcouple.jpg',
      icon: '🏝️',
    },
  ],
  'Ponta do Sol': [
    {
      id: 'praia-ponta-sol',
      title: 'Praia da Ponta do Sol',
      type: 'Praia de Calhau, Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, lifeguard, food, bar, parking, sport',
      description: 'Praia urbana de calhau rolado com cerca de 160 metros, situada numa enseada protegida por escarpas. Conhecida pelas suas águas límpidas e clima ameno durante todo o ano.',
      image: 'src/assets/images/simonzino_praia_da-ponta_do_sol_a.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-madalena-mar',
      title: 'Praia da Madalena do Mar',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'food, bar',
      description: 'Praia de calhau com diversas infraestruturas de apoio, ideal para famílias. Possui Bandeira Azul e é conhecida pelas suas águas calmas e ambiente acolhedor.',
      image: 'src/assets/images/simonzino_praia-da-madalena_do-mar_e.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-lugar-de-baixo',
      title: 'Praia do Lugar de Baixo',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'bar,food,parking',
      description: 'Praia composta por calhau e areia preta, localizada numa das zonas mais quentes da ilha. Popular entre surfistas devido às suas ondas desafiantes.',
      image: 'src/assets/images/simonzino_lagoa_do_lugar_de_baixo_a.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-dos-anjos',
      title: 'Praia dos Anjos',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar',
      description: 'Praia de calhau e areia preta, situada entre Ponta do Sol e Madalena do Mar. Oferece uma vista privilegiada para o pôr do sol e é acessível pela ER101.',
      image: 'src/assets/images/simonzino_praia_dos_anjos_2.jpg',
      icon: '🏝️',
    },
    {
      id: 'praia-cais-do-tunel',
      title: 'Praia do Cais do Túnel',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'none',
      description: 'Pequena praia localizada junto ao histórico Cais da Ponta do Sol, inaugurado em 1849. Ideal para apreciar o pôr do sol e desfrutar de um ambiente tranquilo.',
      image: 'src/assets/images/810078efbe0423bbe5ded4b7fe9a8358.jpeg',
      icon: '🏝️',
    },
  ],
  'Calheta': [
    {
      id: 'praia-da-calheta',
      title: 'Praia da Calheta',
      type: 'Praia de Areia, Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, lifeguard, parking, sport',
      description: 'Praia artificial de areia dourada, protegida, ideal para famílias e banhistas.',
      image: '/images/calheta_praia1-francisco-correia.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-paul-do-mar',
      title: 'Praia do Paul do Mar',
      type: 'Praia de Calhau, Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar',
      description: 'Praia de calhau conhecida pelas suas ondas fortes, sendo um dos principais spots de surf da Madeira.',
      image: 'src/assets/images/praia-do-maktub-paul-do-mar.jpeg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-porto-paul-do-mar',
      title: 'Praia do Porto (Paul do Mar)',
      type: 'Praia de Calhau, Piscina Natural',
      price: 'Grátis',
      facilities: 'shower, food, bar',
      description: 'Pequena praia de calhau junto ao cais de Paul do Mar, popular entre locais e visitantes.',
      image: '/images/p5.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-secreta-jardim-do-mar',
      title: 'Praia Secreta do Jardim do Mar',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'none',
      description: 'Pequena praia isolada no final da promenade do Jardim do Mar, acessível apenas a pé, ideal para quem procura tranquilidade.',
      image: '/images/jardim_do_mar_fc_turismo_da_madeira-1.jpg',
      icon: '🏝️',
    },
    {
      id: 'praia-do-portinho',
      title: 'Praia do Portinho (Jardim do Mar)',
      type: 'Praia de Calhau, Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar',
      description: 'Pequena praia de calhau, localizada na extremidade leste do Jardim do Mar.',
      image: '/images/calhera_jardimdomar7.jpg',
      icon: '🏖️',
    },
  ],
  'Porto Moniz': [
    {
      id: 'piscinas-naturais',
      title: 'Piscinas Naturais do Porto Moniz',
      type: 'Piscinas naturais, Acesso ao mar',
      price: 'Pago',
      facilities: 'wc, shower, food, bar, lifeguard',
      description: 'Famosas piscinas naturais vulcânicas com vistas deslumbrantes do Atlântico.',
      image: '/images/piscinas-naturais-porto-moniz-17.jpg',
      icon: '🌋',
    },
    {
      id: 'piscinas-naturais-velhas',
      title: 'Piscinas Naturais Velhas',
      type: 'Piscinas naturais',
      price: 'Grátis',
      facilities: 'none',
      description: 'Piscinas naturais mais rústicas, sem infraestruturas, ideais para quem procura um mergulho rápido com uma experiência mais natural.',
      image: '/images/porto-moniz-madeira-piscinas-naturais-velhas-visitantes.jpg',
      icon: '🌋',
    },
    {
      id: 'ribeira-da-janela',
      title: 'Praia da Ribeira da Janela',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'none',
      description: 'Praia de calhau situada na foz da Ribeira da Janela, com paisagens impressionantes e boas condições para surf.',
      image: '/images/ribeira-da-janela-rocks-clear-water.jpg',
      icon: '🏖️',
    },
    {
      id: 'piscinas-naturais-do-seixal',
      title: 'Piscinas Naturais do Seixal (Poças das Lesmas)',
      type: 'Piscinas naturais',
      price: 'Grátis',
      facilities: 'shower, parking',
      description: 'Piscinas naturais formadas por rochas vulcânicas, oferecendo um ambiente tranquilo e paisagens únicas.',
      image: '/images/naturalpoolseixal-qc263qfr4k2gae1i7rju6uq6ubdgf136q6r0rtrtec.jpg',
      icon: '🌋',
    },
    {
      id: 'piscinas-clube-naval-do-seixal',
      title: 'Piscinas Naturais do Clube Naval do Seixal',
      type: 'Piscinas naturais',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar',
      description: 'Praia de areia preta com águas cristalinas, rodeada por montanhas verdes, ideal para relaxar e praticar surf.',
      image: '/images/piscinas-do-clube-naval-do-seixal.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-seixal',
      title: 'Praia do Seixal',
      type: 'Praia de Areia Preta',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, lifeguard',
      description: 'Praia de areia preta com águas cristalinas, rodeada por montanhas verdes, ideal para relaxar e praticar surf.',
      image: '/images/seixal_praiadoporto5.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-da-laje',
      title: 'Praia da Laje (Jamaica)',
      type: 'Praia de Calhau, Acesso ao mar',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, parking',
      description: 'Conhecida como "Jamaica" devido às palmeiras ao longo da promenade, esta praia oferece um cenário paradisíaco e tranquilo.',
      image: '/images/madeira033henrique-seruca.jpg',
      icon: '🏖️',
    },
  ],
  'São Vicente': [
    {
      id: 'piscinas-do-calamar',
      title: 'Piscinas do Calamar',
      type: 'Piscina, Piscina Natrural',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar',
      description: 'Piscinas tanto naturais como artificiais, situadas à beira mar com bar de apoio do Hotel onde se situam.',
      image: 'src/assets/images/18953288_802806249895726_6131212714548799089_o.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-faja-da-areia',
      title: 'Praia da Fajã da Areia',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'none',
      description: 'Praia de calhau protegida por um quebra-mar, ideal para desportos náuticos como surf e bodyboard.',
      image: 'src/assets/images/dji_0047.jpg',
      icon: '🏖️',
    },
    {
      id: 'complexo-balnear-ponta-delgada',
      title: 'Complexo Balnear da Ponta Delgada',
      type: 'Complexo balnear, Piscina',
      price: 'Pago',
      facilities: 'wc, shower, lifeguard, food, bar, parking',
      description: 'Complexo com duas piscinas de água salgada, área de solário, esplanada, balneários, estacionamento e uma praia numa baía protegida.',
      image: 'src/assets/images/2022_04_15_jam9315_15h_41m25s_18-mm_nikon-d700_camera_2219612_iso-200.jpg',
      icon: '🏖️',
    },
  ],
  'Santana': [
    {
      id: 'praia-do-faial',
      title: 'Praia do Faial',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, parking, sport',
      description: 'Praia tranquila com calhau, protegida por uma parede de rochas, ideal para famílias.',
      image: 'src/assets/images/Praia_do_Faial_CMS.jpg',
      icon: '🏖️',
    },
    {
      id: 'faja-do-mar-do-faial',
      title: 'Fajã do Mar do Faial',
      type: 'Praia escondida',
      price: 'Grátis',
      facilities: 'none',
      description: 'Pequena praia de calhau junto ao cais da Faja do Mar, no Faial, acessível por trilhos.',
      image: '/images/Cais-do-Faial-Faja-do-Mar-1.jpg',
      icon: '🏝️',
    },
    {
      id: 'faja-da-rocha-do-navio',
      title: 'Fajã da Rocha do Navio',
      type: 'Reserva natural',
      price: 'Grátis',
      facilities: 'cablecar',
      description: 'Área protegida com fajãs agrícolas, cascatas e acesso por teleférico ou trilho.',
      image: '/images/teleferico-rocha-do-navio-francisco-correoa.jpg',
      icon: '🚡',
    },
    {
      id: 'complexo-calhau-sao-jorge',
      title: 'Complexo Balnear do Calhau de São Jorge',
      type: 'Complexo balnear',
      price: 'Grátis',
      facilities: 'wc, food, bar, shower, parking',
      description: 'Complexo com três piscinas, lagoa natural e acesso ao mar (não recomendado para banhistas).',
      image: '/images/saojorge_fosdaribeira5.jpg',
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
      image: '/images/dji_0671.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-pato-bravo',
      title: 'Praia do Pato Bravo (Praia do Penedo)',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'none',
      description: 'Praia de areia dourada, que cobre desde o porto de abrigo até ao icónico cais da Vila Baleira.',
      image: '/images/praia13-vitor-reinecke.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-da-fontinha',
      title: 'Praia da Fontinha (Vila Baleira)',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, lifeguard, parking',
      description: 'Praia a seguir ao cais, com várias infraestruturas de apoio, hoteis e proximidade ao centro da Vila Baleira.',
      image: '/images/portosanto_balnearios10.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-das-pedras-pretas',
      title: 'Praia das Pedras Pretas',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'wc, food, bar, parking',
      description: 'Praia à saída da Vila Baleira, com estacionamento na estrada e um acesso pedonal que termina num bar de apoio nas dunas e um clima familiar, reservado e descontraído.',
      image: '/images/praia-do-porto-santo3_henrique.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-henrique',
      title: 'Praia do Henrique (Praia do Ribeiro Cochino)',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, lifeguard, parking',
      description: 'Mais conhecida pelo Bar do Henrique situado em cima das dunas, esta praia possui acessos às dunas com estacionamento, bares de apoio e uma ida ao mar descontraída e sem pedras.',
      image: '/images/portosanto_pedraspretas6.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-ribeiro-salgado',
      title: 'Praia do Ribeiro Salgado',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, parking',
      description: 'Situada no final de um ribeiro que lhe dá nome, esta zona de praia possuí estacionamento, bares de apoio e um fácil acesso ao areal, perfeito para uma ida à praia para toda a família.',
      image: '/images/praia-ribeiro-salgado001-rui-melim.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-cabeco-da-ponta',
      title: 'Praia do Cabeço da Ponta',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'lifeguard',
      description: 'Situada a 4km da Vila Baleira, e junto a diversos hotéis, esta praia conjuga um extenso areal com uma grande exposição aos elementos o que causa por vezs grandes ondas.',
      image: '/images/praia-vila-baleira-ilhavisão-multimedia.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-da-ponta-da-calheta',
      title: 'Praia da Ponta da Calheta',
      type: 'Praia de Areia',
      price: 'Grátis',
      facilities: 'wc, shower, food, bar, lifeguard, parking',
      description: 'Praia de areia na ponta oeste da ilha, com formações rochosas, pequenas piscinas naturais e vista para o Ilhéu da Cal.',
      image: '/images/praia-da-caelha003-rui-melim.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-das-salemas',
      title: 'Praia das Salemas',
      type: 'Praia de Areia, Piscinas Naturais',
      price: 'Grátis',
      facilities: 'parking',
      description: 'Praia de areia com dezenas de pequenas piscinas naturais, de acesso apenas a pé ou com veículos 4x4, convém frequentar com a maré baixa.',
      image: '/images/zimbralinhos porto santo_1.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-zimbralinho',
      title: 'Praia do Zimbralinho',
      type: 'Praia de Calhau',
      price: 'Grátis',
      facilities: 'boat',
      description: 'Pequena enseada de calhau, perfeita para quem procura tranquilidade, acesso apenas a pé ou por barco.',
      image: '/images/zimbralinhos porto santo_1.jpg',
      icon: '🏖️',
    },
    {
      id: 'praia-do-porto-dos-frades',
      title: 'Praia do Porto dos Frades (Praia do Cotrim)',
      type: 'Praia de Calhau, Praia de Areia',
      price: 'Grátis',
      facilities: 'parking',
      description: 'Pequena praia de calhau junto ao antigo porto de pesca dos Frades, com um ambiente isolado e tranquilo, ideal para quem procura um local menos frequentado.',
      image: '/images/portosanto_portodoferades21.jpg',
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
    sport: 'fa-solid fa-futbol', // Sports icon
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