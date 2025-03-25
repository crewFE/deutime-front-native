import React, { useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { usePacoteEsporte } from "@/src/api/hooks/usePacoteEsporte";
import { usePacoteLocal } from "@/src/api/hooks/useLocais";
import { ImageCard } from "@/src/components/ImageCard";
import TextCard from "@/src/components/TextCard";
import { LinearGradient } from "expo-linear-gradient";

function HomeScreen() {
  const { esportes, loading, fetchEsportes } = usePacoteEsporte();
  const { locais, fetchLocais } = usePacoteLocal();

  const regioes = [
    {
      id: 1,
      descricao: "Morumbi",
      fotoLocal:
        "https://www.h2foz.com.br/wp-content/uploads/2024/11/Morumbi-Foz-MarcosLabanca.jpg",
    },
    {
      id: 2,
      descricao: "Jardim Universitário",
      fotoLocal: "https://gdia.com.br/wp-content/uploads/2023/10/unila-1.jpg",
    },
    {
      id: 3,
      descricao: "Vila A",
      fotoLocal:
        "https://i1.wp.com/100fronteiras.com/wp-content/uploads/2020/08/obras-ctg-charrua-foz-foto-itaipu-e1597425477601.jpg?fit=800%2C534&ssl=1",
    },
  ];

  useEffect(() => {
    fetchEsportes();
    fetchLocais();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const modalidades = Array.isArray(esportes) ? esportes : [];
  const locaisArray = Array.isArray(locais) ? locais : [];

  return (
    <LinearGradient
      colors={["#2596be", "#001A6E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.centered}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.titleHeader}>Modalidades</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {modalidades.length > 0 ? (
            <View style={styles.row}>
              {modalidades.map((modalidade) => (
                <TextCard
                  key={modalidade.id}
                  id={modalidade.id}
                  descricao={modalidade.nome}
                  fotoURL={modalidade.imagem}
                  type={"sport"}
                  sportName={modalidade.nome}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Nenhuma modalidade encontrada</Text>
          )}
        </ScrollView>
        <View style={styles.section}>
          <Text style={styles.titleHeader}>Regiões</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            <View style={styles.row}>
              {regioes.map((regiao) => (
                <ImageCard
                  key={regiao.id}
                  id={regiao.id}
                  descricao={regiao.descricao}
                  fotoURL={regiao.fotoLocal}
                  type="region"
                />
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.titleHeader}>Praças Esportivas</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <View style={styles.row}>
              {locaisArray.map((local) => (
                <ImageCard
                  key={local.id}
                  id={local.id}
                  descricao={local.descricao}
                  fotoURL={local.fotoLocal}
                  type="court"
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#001A6E",
    height: "100%",
    overflow: "hidden",
    padding: 0,
  },
  section: {
    marginBottom: 20,
  },
  titleHeader: {
    color: "#fafafa",
    fontSize: 36,
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  horizontalScroll: {
    padding: 10,
  },
  emptyText: {
    color: "#fafafa",
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  logo: {
    marginTop: "15%",
    width: 300,
    height: 200,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
});

export default HomeScreen;
