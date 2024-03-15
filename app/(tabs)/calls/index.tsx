import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import calls from "@/assets/data/calls.json";
import { defaultStyles } from "@/constants/styles";
import { format } from "date-fns";
import { SegmentedControl } from "@/components/SegmentedControl";
import Animated, { CurvedTransition, FadeInUp, FadeOutUp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SwipeableRow from "@/components/SwipeableRow";
import * as Haptics from "expo-haptics";

const transition = CurvedTransition.delay(100);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const Page = () => {
  type callType = {
    id: string;
    name: string;
    date: string;
    incoming: boolean;
    missed: boolean;
    img: string;
    video: boolean;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<callType[]>(calls);
  const [selectedOption, setSelectedOption] = useState("All");
  const editing = useSharedValue(-35);

  const onEdit = () => {
    let editingNew = !isEditing;
    editing.value = editingNew ? 0 : -35;
    setIsEditing(editingNew);
  };

  const removeCall = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems(calls.filter((i) => i.id !== item.id));
  };

  const removeAllCalls = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems([]);
  };

  const animatedRowStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(editing.value),
      },
    ],
  }));

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(calls);
    } else {
      setItems(calls.filter((item) => item.missed));
    }
  }, [selectedOption]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{

          headerTitle: () => (
            <SegmentedControl options={["All", "Missed"]} selectedOption={selectedOption} onOptionPress={setSelectedOption} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ fontSize: 18, color: Colors.primary }}>
                {isEditing ? "Done" : "Edit"}
              </Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              {!isEditing 
                ? <MaterialIcons name="add-ic-call" size={30} color={Colors.primary} />
                : <Text style={{ color: Colors.primary, fontSize: 16 }} onPress={removeAllCalls}> Clear </Text>
              }
            </TouchableOpacity>
          )

        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingBottom: 20 }}>
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList skipEnteringExitingAnimations data={items} scrollEnabled={false} style={{ paddingVertical: 10 }} itemLayoutAnimation={transition}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item, index }) => (
              <SwipeableRow onDelete={() => removeCall(item)}>
                <Animated.View entering={FadeInUp.delay(index * 20)} exiting={FadeOutUp} style={{ flexDirection: "row", alignItems: "center" }}>
                  <AnimatedTouchableOpacity onPress={() => removeCall(item)} style={[animatedRowStyle, { paddingLeft: 6 }]}>
                    <Ionicons name="remove-circle" size={30} color={Colors.red}/>
                  </AnimatedTouchableOpacity>
                  <Animated.View style={[defaultStyles.item, animatedRowStyle]}>
                    <Image source={{ uri: item.img }} style={styles.avatar} />
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text style={{ fontSize: 18, color: item.missed ? Colors.red : Colors.black}}>{item.name}</Text>
                      <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons name={item.video ? "videocam" : "call"} size={16} color={Colors.gray}/>
                        <Text style={{ color: Colors.gray, flex: 1 }}>{item.incoming ? "Incoming" : "Outgoing"}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: 6, alignItems: "center"}}>
                      <Text style={{ color: Colors.gray }}>{format(item.date, "MM/dd/yy")}</Text>
                      <Ionicons name="information-circle-outline" size={24} color={Colors.primary}/>
                    </View>
                  </Animated.View>
                </Animated.View>
              </SwipeableRow>
            )}
            keyExtractor={(item) => item.id}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Page;
