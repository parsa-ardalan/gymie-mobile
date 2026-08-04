import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  Text,
  View
} from 'react-native';


type Props = {
  item: any;
  index: number;
  onDone: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};


export default function ExerciseCard({
  item,
  index,
  onDone,
  onEdit,
  onDelete
}: Props) {


  const [showActions, setShowActions] = useState(false);


  return (

    <Pressable

      style={[
        styles.movementCard,
        item.isDone && styles.movementCardDone,
      ]}

      onLongPress={() => setShowActions(true)}

      delayLongPress={500}

      onPress={() => {
        if (showActions) {
          setShowActions(false);
        }
      }}

    >

      <Text style={styles.movementName}>
        {item.exerciseId}
      </Text>



      <View style={styles.setRow}>

        <Text style={styles.setCountText}>
          {item.sets.length} ست
        </Text>


        <View style={styles.setValuesWrapper}>

          {
            item.sets.map(
              (set: number, i: number) => (

                <Text
                  key={i}
                  style={styles.setValueText}
                >
                  {set}
                </Text>

              )
            )
          }

        </View>

      </View>



      {
        !item.isDone ? (

          <Pressable

            style={styles.doneButton}

            onPress={() => onDone(index)}

          >

            <Text style={styles.doneButtonText}>
              اتمام حرکت
            </Text>

          </Pressable>


        ) : (

          <View
            style={styles.successDoneButton}
          >

            <Ionicons
              name="checkmark-circle"
              size={24}
              color="currentColor"
              style={styles.successDoneIcon}
            />

          </View>

        )
      }

      {
        showActions && (

          <View style={styles.actions}>

            <Pressable
              onPress={() => onEdit(index)}
            >

              <Ionicons
                name="create-outline"
                size={20}
                color="white"
              />

            </Pressable>



            <Pressable
              onPress={() => onDelete(index)}
            >

              <Ionicons
                name="trash-outline"
                size={20}
                color="red"
              />

            </Pressable>


          </View>

        )
      }


    </Pressable>

  );

}