import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { updateWeekDayPercent } from '@/redux/weekday/weekdaySlice';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

type SetValue = string | number;

type MovementItem = {
    id?: string | number;
    name: string;
    sets?: SetValue[];
};

type WeekdayItem = {
    id?: string | number;
    name: string;
    type: string;
    planfilename: string;
    activityPercent: number; // مهم: number
};

type RootState = {
    weekday: WeekdayItem[];
};

type RecoveryIconItem = {
    id: number;
    name: string;
    image: any;
    link: string;
};

export default function Plan() {
    const dispatch = useDispatch();
    const params = useLocalSearchParams<{ slug?: string; weekday?: string }>();

    const weekdayList = useSelector((state: RootState) => state.weekday);

    const weekday = useMemo(() => {
        return weekdayList.find((day) => day.name === params.weekday);
    }, [weekdayList, params.weekday]);

    const recovery = useMemo(
        () => ({
            title: 'ریکاوری',
            subtitle: [
                'امروز تمرینی نداری. بجاش خوب استراحت کن',
                'یادت نره رژیم غذایی و خواب کافی داشته باشی',
                'بدنت نیاز به استراحت داره. امروز رو تمرین نکن',
                'امروز نیازی نیست بری باشگاه. بجاش روی بقیه چیزا تمرکز کن',
            ],
        }),
        []
    );

    const subtitleText = useMemo(() => {
        const rand = Math.floor(Math.random() * recovery.subtitle.length);
        return recovery.subtitle[rand];
    }, [recovery.subtitle]);

    const icons: RecoveryIconItem[] = [
        { id: 0, name: 'profile', image: require('@/assets/icons/profile.png'), link: '/profile' },
        { id: 1, name: 'diet', image: require('@/assets/icons/diet.png'), link: '/diet' },
        { id: 2, name: 'blogs', image: require('@/assets/icons/blogs.png'), link: '/blogs' },
    ];

    if (!weekday) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>برنامه‌ای برای این روز پیدا نشد</Text>
            </View>
        );
    }

    const dayData = {
        dataname: weekday.planfilename,
        name: weekday.name,
        type: weekday.type,
    };

    const jsonFile: MovementItem[] = useMemo(() => {
        try {
            switch (dayData.dataname) {
                case 'sat': return require('@/data/workout/dayPlans/sat.json');
                case 'sun': return require('@/data/workout/dayPlans/sun.json');
                case 'mon': return require('@/data/workout/dayPlans/mon.json');
                case 'tue': return require('@/data/workout/dayPlans/tue.json');
                case 'wed': return require('@/data/workout/dayPlans/wed.json');
                case 'thu': return require('@/data/workout/dayPlans/thu.json');
                case 'fri': return require('@/data/workout/dayPlans/fri.json');
                default: return [];
            }
        } catch (error) {
            console.log('Error loading JSON file:', error);
            return [];
        }
    }, [dayData.dataname]);

    const [movesDone, setMovesDone] = useState<boolean[]>([]);
    const [percentShow, setPercentShow] = useState(0);

    useEffect(() => {
        setMovesDone(jsonFile.map(() => false));
        setPercentShow(0);

        // FIX: number به جای string
        dispatch(
            updateWeekDayPercent({
                dayname: dayData.name,
                dayPercent: 0,
            })
        );
    }, [jsonFile, dayData.name, dispatch]);

    const movementQuantity = jsonFile.length;
    const movementPercent = movementQuantity > 0 ? 100 / movementQuantity : 0;

    const handleMoveDone = (index: number) => {
        if (movesDone[index]) return;

        const newMovesDone = [...movesDone];
        newMovesDone[index] = true;

        const doneCount = newMovesDone.filter(Boolean).length;
        const newPercent = Math.min(doneCount * movementPercent, 100);

        setMovesDone(newMovesDone);
        setPercentShow(newPercent);

        // FIX: number ذخیره میشه (نه string)
        dispatch(
            updateWeekDayPercent({
                dayname: dayData.name,
                dayPercent: Math.round(newPercent),
            })
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.page}>

                {dayData.type === 'workday' ? (
                    <View style={styles.workSection}>

                        <View style={styles.percentBox}>
                            <View style={styles.percentNumberWrapper}>
                                <Text style={styles.percentNumberText}>
                                    {Math.round(percentShow)}%
                                </Text>
                            </View>

                            <View style={styles.percentBarWrapper}>
                                <View style={styles.percentBarBackground}>
                                    <View
                                        style={[
                                            styles.percentBarFill,
                                            { width: `${percentShow}%` },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>

                        {jsonFile.map((movement, index) => {
                            const isDone = movesDone[index];

                            return (
                                <View
                                    key={movement.id ?? index}
                                    style={[
                                        styles.movementCard,
                                        isDone && styles.movementCardDone,
                                    ]}
                                >
                                    <View style={styles.movementNameWrapper}>
                                        <Text style={styles.movementName} numberOfLines={1}>
                                            {movement.name}
                                        </Text>
                                    </View>

                                    <View style={styles.setRow}>
                                        <View style={styles.setCountWrapper}>
                                            <Text style={styles.setCountText}>
                                                {movement.sets?.length || 0} ست
                                            </Text>
                                        </View>

                                        <View style={styles.setValuesWrapper}>
                                            {movement.sets?.map((setValue, setIndex) => (
                                                <Text key={setIndex} style={styles.setValueText}>
                                                    {setValue}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>

                                    <View style={styles.buttonWrapper}>
                                        {!isDone ? (
                                            <Pressable
                                                style={styles.doneButton}
                                                onPress={() => handleMoveDone(index)}
                                            >
                                                <Text style={styles.doneButtonText}>اتمام حرکت</Text>
                                            </Pressable>
                                        ) : (
                                            <View style={styles.successButton}>
                                                <Image
                                                    source={require('@/assets/icons/success.png')}
                                                    style={styles.successIcon}
                                                    resizeMode="contain"
                                                />
                                            </View>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <View style={styles.recoveryPage}>
                        <View style={styles.recoveryCard}>
                            <View style={styles.recoveryIconWrapper}>
                                <Image
                                    source={require('@/assets/icons/recovery.png')}
                                    style={styles.recoveryIcon}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={styles.recoveryTitleWrapper}>
                                <Text style={styles.recoveryTitle}>{recovery.title}</Text>
                                <Text style={styles.recoverySubtitle}>{subtitleText}</Text>
                            </View>

                            <View style={styles.recoveryLinksRow}>
                                {icons.map((item) => (
                                    <View key={item.id} style={styles.recoveryLinkItem}>
                                        <Image
                                            source={item.image}
                                            style={styles.recoveryLinkIcon}
                                            resizeMode="contain"
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )}

            </View>
        </ScrollView>
    );
}