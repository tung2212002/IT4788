// import React from "react";
// import styled from "styled-components/native";

// import Color from "../utils/Color";

// function GridImageView({ images }) {
//     const [imageIndex, setImageIndex] = React.useState(0);
//     const [show, setShow] = React.useState(false);
//     const length = images.length;
//     return (
//         <Container>
//             {images.map((image, index) => (
//                 <TouchableOpacity key={index} onPress={() => { setImageIndex(index); setShow(true); }}>
//                     <Image source={{ uri: image }} />
//                 </TouchableOpacity>
//             ))}
//             <Modal visible={show} transparent={true}>
//                 <ModalContainer>
//                     <TouchableOpacity onPress={() => setShow(false)}>
//                         <CloseIcon name="close" size={30} color={Color.white} />
//                     </TouchableOpacity>
//                     <Image source={{ uri: images[imageIndex] }} />
//                     <PaginationContainer>
//                         <PaginationText>{imageIndex + 1}/{length}</PaginationText>
//                     </PaginationContainer>
//                 </ModalContainer>
//             </Modal>
//         </Container>
//     )