export const en = {

    home: {
        title: 'Hey! Welcome back',

        welcomeMessages: [
            "What's your plan for today?",
            'Want to work out together?',
            'How are you feeling? Ready to work out?',
            "I can see you're ready to work out!",
        ],

        activities: {
            workout: 'Workout Plan',
            diet: 'Diet Plan',
            aiCoach: 'AI Coach',
        },
    },

    workouts: {
        days: [
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
        ],

        plan: {
            addExercise: "New Exercise",
            editExercise: "Edit Exercise",
            deleteExercise: "Delete Exercise",
            exerciseName: "Exercise Name",
            set: "sets",
            button: "complete move",
            setsPlaceholder: "12 10 8",
            confirm: "Confirm",
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            deleteConfirmation: "Are you sure you want to delete {exercise}?",
            loading: "...",
            restText: "Take rest for a while"
        },
    },

    diet: {
        days: [
            'Saturday',
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
        ],

        mealPlan: 'Meal Plan',
        day: 'Day',
        notFound: 'Meal plan not found',

        mealNames: {
            breakfast: 'Breakfast',
            lunch: 'Lunch',
            dinner: 'Dinner',
        },

        ingredient: {
            defaultName: 'Ingredient',
            add: 'Add Ingredient',
        },
    },

    sleeping: {
        title: 'Night Sleep',

        infoText:
            'A good night’s sleep is one of the most important parts of your health and plays a major role in your body’s recovery. Based on your workout plan and body stats, I calculated the amount of sleep you need to help you rest more consistently.',

        suggestedSleepTime: 'Suggested Sleep Time',
        sleepingTime: 'Bedtime',
        wakeTime: 'Wake-up Time',

        hour: 'hours',
    },

    coach: {
        botAnswers: [
            'How about we save this conversation for later?',
            "I'm not in the mood today... Can we talk later?",
            "Forget about this... Tell me, did you solve yesterday's problem?",
            "I didn't understand. What?",
            'Seriously, right now? :/',
            'Hmmmm! What do you think?',
            'Sorry, I got distracted. Can you say that again?',
            'Sorry, your message came through messy.',
            "Just come to the gym and don't worry about this stuff.",
            "I'm busy right now. I'll answer you in a few minutes.",
            "I only answer your fitness questions. If it's about something else, we'll talk when I see you at the gym.",
            "This isn't really the place for that... Let's talk about it in person.",
            'No.',
            'Yeah.',
            "I don't know...",
        ],

        initialUserMessage: 'Gymie is online... Chat with him',

        initialBotMessage: "Hi... I'm Gymie. I'm your AI Coach.",

        name: 'Gymie',

        status: 'Online',

        inputPlaceholder: 'Message...',
    },

    profile: {
        age: 'Age',
        weight: 'Weight',
        height: 'Height',
        account: 'Account',
        activeDays: 'Day Streak',
        weeklyActivity: 'Weekly Activity',
    },

    account: {
        username: 'Username',
        biography: 'Biography',
        age: 'Age',
        height: 'Height (cm)',
        weight: 'Weight (kg)',

        confirm: 'Confirm',

        editInfo: 'Edit Profile',
        subscription: 'Buy Subscription',
        logout: 'Log Out',

        subscriptionMessage: "You haven't purchased a subscription yet!",
        okay: 'Okay',

        logoutMessage: 'Are you sure you want to log out?',
        logoutConfirm: 'Log Out',
        logoutCancel: 'Not Now',
    },

    activity: {
        workout: 'workout',
        bodyForm: 'physique',
        weight: "weight stat",
        sleep: 'sleeping',
        calories: "today calories",

        bodyTypes: {
            unavailable: '-',
            underweight: 'slim',
            ideal: 'Ideal',
            overweight: 'fat',
            obese: 'Obese',
        },

        sleepStatus: {
            regular: 'Regular',
            irregular: 'Irregular',
        },
    },

    auth: {
        login: {
            title: "Hi! Welcome",
            subtitle: "Log in quickly, we've got a lot to do",

            phonePlaceholder: "Phone number",

            invalidPhone: "Invalid phone number",
            serverError: "An error occurred while connecting to the server",
            invalidOtp: "Incorrect code",
            otpVerificationError: "An error occurred while verifying the code",

            sending: "Sending...",
            next: "Next",

            resendCountdown: "Wait to resend the code",
            seconds: "seconds",
            resendCode: "Resend code",

            okay: "Okay",

            noAccount: "Don't have an account? Sign up",
        },

        signup: {
            title: "Hi! Welcome",
            subtitle: "Create your account and let's get started",

            username: "Username",
            biography: "Biography",
            age: "Age",
            height: "Height",
            weight: "Weight",
            phonePlaceholder: "Phone number",

            fillAllFields: "Please fill in all fields",
            invalidInformation: "The entered information is invalid",
            invalidPhone: "Invalid phone number",
            serverError: "Error connecting to the server",
            invalidOtp: "Incorrect code",
            otpVerificationError: "Error verifying OTP",

            sending: "Sending...",
            next: "Next",

            resendCountdown: "Wait to resend the code",
            seconds: "seconds",
            resendCode: "Resend code",

            okay: "Okay",

            haveAccount: "Already have an account? Log in",
        },
    },

    noInternet: {
        title: 'Connection Failed',
        message: 'It looks like your internet connection is lost. The app may not work properly.',
        retry: 'Try Again',
        exit: 'Exit App',
    },

    settings: {
        language: 'Language',
        persian: 'Persian',
        english: 'English',

        notifications: 'Notifications',
        enableFromDeviceSettings: 'Enable from device settings',
        openSettings: 'Open Settings',

        theme: 'Theme',
        dark: 'Dark',
    },

    notifications: {
        sleep: {
            title: "🌙 Bedtime",
            body: "Get ready for a good night's sleep",
        },

        wake: {
            title: "☀️ Good morning",
            body: "Start your day with energy",
        },
    },

};
