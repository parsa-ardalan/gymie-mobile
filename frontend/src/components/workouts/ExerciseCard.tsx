import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { Ionicons } from '@expo/vector-icons';
import {
    Pressable,
    Text,
    View
} from 'react-native';


type Props = {
  item: any;
  index: number;
  onDone: (index:number)=>void;
};


export default function ExerciseCard({
  item,
  index,
  onDone
}: Props) {


  return (

    <View

      style={[
        styles.movementCard,
        item.isDone && styles.movementCardDone,
      ]}

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
              (set:number, i:number)=>(
                
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


          <Pressable
            style={styles.successDoneButton}
          >

            <Ionicons

              name="checkmark-circle"

              size={24}

              color="currentColor"

              style={styles.successDoneIcon}

            />

          </Pressable>


        )
      }


    </View>

  );

}