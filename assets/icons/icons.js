import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Font5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import EntIcon from 'react-native-vector-icons/Entypo';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FonIcon from 'react-native-vector-icons/Fontisto';
import FeatIcon from 'react-native-vector-icons/Feather';

const Mail = ({ style, size, color }) => (
    <AntIcon name="mail" style={style} size={size} color={color} />
);

const Lock = ({ style, size, color }) => (
    <AntIcon name="lock" style={style} size={size} color={color} />
);

const ArrowLeft = ({ style, size, color }) => (
    <AntIcon name="arrowleft" style={style} size={size} color={color} />
);

const ArrowRight = ({ style, size, color }) => (
    <AntIcon name="arrowright" style={style} size={size} color={color} />
);

const NavBurger = ({ style, size, color }) => (
    <FonIcon name="nav-icon-a" style={style} size={size} color={color} />
);

const Logout = ({ style, size, color }) => (
    <EntIcon name="log-out" style={style} size={size} color={color} />
);

const Book = ({ style, size, color }) => (
    <Font5Icon name="book" style={style} size={size} color={color} />
);

const Search = ({ style, size, color }) => (
    <AntIcon name="search1" style={style} size={size} color={color} />
);

const Fire = ({ style, size, color }) => (
    <Font5Icon name="fire-alt" style={style} size={size} color={color} />
);

const Restart = ({ style, size, color }) => (
    <MatIcon name="restart-alt" style={style} size={size} color={color} />
);

const YouTube = ({ style, size, color }) => (
    <EntIcon name="youtube" style={style} size={size} color={color} />
);

const Settings = ({ style, size, color }) => (
    <Ionicon name="settings-sharp" style={style} size={size} color={color} />
);

const Leaderboard = ({ style, size, color }) => (
    <MatIcon name="leaderboard" style={style} size={size} color={color} />
);

const Edit = ({ style, size, color }) => (
    <FeatIcon name="edit" style={style} size={size} color={color} />
);

const Checkmark = ({ style, size, color }) => (
    <FeatIcon name="check" style={style} size={size} color={color} />
);

const ViewPassword = ({ style, size, color }) => (
    <EntIcon name="eye" style={style} size={size} color={color} />
);

const HidePassword = ({ style, size, color }) => (
    <EntIcon name="eye-with-line" style={style} size={size} color={color} />
);

const Offline = ({ style, size, color }) => (
    <Ionicon name="cloud-offline-outline" style={style} size={size} color={color} />
);

const Shuffle = ({ style, size, color }) => (
    <EntIcon name="shuffle" style={style} size={size} color={color} />
);

const Link = ({ style, size, color }) => (
    <EntIcon name="link" style={style} size={size} color={color} />
);

const ChevronUp = ({ style, size, color }) => (
    <Font5Icon name="chevron-up" style={style} size={size} color={color} />
);

const ChevronDown = ({ style, size, color }) => (
    <Font5Icon name="chevron-down" style={style} size={size} color={color} />
);

const PhoneCheck = ({ style, size, color }) => (
    <MatComIcon name="cellphone-check" style={style} size={size} color={color} />
);

const WrongSolid = ({ style, size, color }) => (
    <AntIcon name="closesquareo" style={style} size={size} color={color} />
);

const WrongCloseSolid = ({ style, size, color }) => (
    <AntIcon name="closesquare" style={style} size={size} color={color} />
);

const UserSolid = ({ style, size, color }) => (
    <FontIcon name="user" style={style} size={size} color={color} />
);

const MailSolid = ({ style, size, color }) => (
    <Ionicon name="mail" style={style} size={size} color={color} />
);

const LockSolid = ({ style, size, color }) => (
    <FontIcon name="lock" style={style} size={size} color={color} />
);

const HomeSolid = ({ style, size, color }) => (
    <EntIcon name="home" style={style} size={size} color={color} />
);

const QuizSolid = ({ style, size, color }) => (
    <MatIcon name="quiz" style={style} size={size} color={color} />
);

const PlaySolid = ({ style, size, color }) => (
    <AntIcon name="play" style={style} size={size} color={color} />
);

const BookReaderSolid = ({ style, size, color }) => (
    <Font5Icon name="book-reader" style={style} size={size} color={color} />
);

module.exports = {
    Mail,
    Lock,
    ArrowLeft,
    ArrowRight,
    NavBurger,
    Logout,
    Book,
    Search,
    Fire,
    Restart,
    YouTube,
    Settings,
    Leaderboard,
    Edit,
    Checkmark,
    ViewPassword,
    HidePassword,
    Offline,
    Shuffle,
    Link,
    ChevronUp,
    ChevronDown,
    PhoneCheck,
    WrongSolid,
    WrongCloseSolid,
    UserSolid,
    MailSolid,
    LockSolid,
    HomeSolid,
    QuizSolid,
    PlaySolid,
    BookReaderSolid
};
