import React from "react";
import { TextInput, TouchableOpacity, View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { VStack } from "@/components/ui/vstack";
import FormControl from "@/src/components/FormControl";
import Input from "@/components/Input";
import { Button, ButtonText } from "@/components/ui/button";

export default function NewEvent() {
  const { token } = useSession();
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const validateInput = (value) => {
    const isValid = value.trim().length > 0;
    setIsNameValid(isValid);
    return isValid;
  };

  const handleSubmit = async () => {
    const isNameValid = validateInput(name);

    if (!isNameValid) {
      return;
    }

    const departmentPayload = {
      name: name.trim().toLowerCase(), // Garante que o nome seja em minúsculas e sem espaços extras
    };

      setName("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const department = await DepartmentService(token).getById(id);

          if (department) {
            setName(department.name);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [id, token]); 


  return (
    <ScrollView className="h-full">
    <VStack space="xl" className="p-6" style={styles.container}>
      <FormControl
        labelText="Nome do departamento"
        helperText="Por favor, insira o nome do departamento"
        errorText="O nome é obrigatório"
        size="lg"
        isInvalid={!isNameValid}
        isRequired
      >
        <Input
          placeholder="Nome do departamento"
          inputValue={name}
          setInputValue={setName}
          size="lg"
          autocapitalize="none"
        />
      </FormControl>

      <Button
        className="w-fit self-center mt-4"
        action="positive"
        size="lg"
        onPress={handleSubmit}
      >
        <ButtonText>Salvar</ButtonText>
      </Button>
    </VStack>
    </ScrollView>
  );
}
