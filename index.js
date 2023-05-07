import React, { useState } from "react";
import { Text, StyleSheet, View ,StatusBar, TouchableOpacity,ScrollView,Image,TextInput,ToastAndroid} from "react-native";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Cards from "./card";

export default function Index(){
    

    //const [data,setdata] = useState(true);
    const [expense,setexpense] = useState([]);
    const [accordion, setaccordion] = useState({});
    
    const [modal,setmodal] = useState(false);
    const [val,setval] = useState({name:'',amount:''})

    const [ind,setind] = useState();
    //const [preindex,setpreindex] = useState();
    //const [innerval,setinnerval] = useState([])
    //const [innerindex,setinnerindex] = useState();
    const [editdata,seteditdata] = useState({name:'',amount:''});
    const [editid,seteditid] = useState({child:'',parent:''})
    const [editmodal,seteditmodal] = useState(false);
    //const [editval,seteditval] = useState({name:'',amount:''});
    const [message,setmessage] = useState('')
    const [editmessage,seteditmessage] = useState('')

    
    //console.log(val.amount)
    const add=async()=>{
        const request_option = {
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({name:'add'}),
            redirect: 'follow'
        }

        await fetch('http://192.168.1.14:5550/expense',request_option)
        .then(response => response.json())
        .then(result => setexpense(result))
        .catch(error => console.log('error', error));
        //setdata(false)
    }

    const dele = async (index) =>{
        //setind(index);
        setaccordion({ ...accordion, [index]: false});
        const request_option = {
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({name:'delete',ind:index}),
            redirect: 'follow'
        }

        await fetch('http://192.168.1.14:5550/expense',request_option)
        .then(response => response.json())
        .then(result => setexpense(result))
        .catch(error => console.log('error', error));
        //setdata(false)`
        console.log(request_option.body)
    }

    const innercard_add=(ind)=>{
        setind(ind)
        setmodal(!modal)
        console.log(ind)
    }

    const validate_name=(ele)=>{
        let name_ref = /^[^\s]+(\s+[^\s]+)*$/;
        if(name_ref.test(ele.trim()))
        {
            setval({...val,name:ele})
            setmessage('')
        }
        else{
            setval({...val,name:''})
            setmessage('Enter a Valid Name')
            //ToastAndroid.show('Enter a Valid Name', ToastAndroid.SHORT);
        }
    }

    const validate_amount=(ele)=>{
        let name_ref = /^[1-9][0-9]*$/;
        if(name_ref.test(ele))
        {
            setval({...val,amount:ele})
            setmessage('')
        }
        else{
            setval({...val,amount:''})
            setmessage('Enter a Whole Number')   
            //ToastAndroid.show('Enter a Valid Number', ToastAndroid.SHORT);
        }
    }

    const set_vlaue_inner_card=async()=>{
        setval({name:'',amount:''})
        const request_option = {
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({name:'innercard',data:val,index:ind}),
            redirect: 'follow'
        }

        await fetch('http://192.168.1.14:5550/expense',request_option)
        .then(response => response.json())
        .then(result => {setexpense(result);console.log(result[0].category)})
        .catch(error => console.log('error', error));
        //setdata(false)

    }

    const dele_inner_card=async(ind,Ind)=>{
        
        const request_option = {
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({name:'innercard_delete',par_card:Ind,child_card:ind}),
            redirect: 'follow'
        }

        await fetch('http://192.168.1.14:5550/expense',request_option)
        .then(response => response.json())
        .then(result => {setexpense(result)})
        .catch(error => console.log('error', error));

    }

    const edit_inner_card = async(ele,ind,Ind)=>{
        console.log(ind,Ind)
        seteditdata({name:ele.name,amount:ele.amount})
        seteditid({parent:Ind,child:ind})
        seteditmodal(true)
    }
    
    const validate_edit_name=(ele)=>{
        let name_ref = /^[^\s]+(\s+[^\s]+)*$/;
        if(name_ref.test(ele.trim()))
        {
            seteditdata({...editdata,name:ele})
            seteditmessage('')
        }
        else{
            seteditdata({...editdata,name:''})
            seteditmessage('Enter a Valid Name')
            //ToastAndroid.show('Enter a Valid Name', ToastAndroid.SHORT);
        }
    }

    const validate_edit_amount=(ele)=>{
        let name_ref = /^[1-9][0-9]*$/;
        if(name_ref.test(ele))
        {
            seteditdata({...editdata,amount:ele})
            seteditmessage('')
        }
        else{
            seteditdata({...editdata,amount:''})
            seteditmessage('Enter a Whole Number')
            //ToastAndroid.show('Enter a Valid Number', ToastAndroid.SHORT);
        }
    }

    const set_edit_value_inner_card=async()=>{
        console.log('joel')
        seteditmodal(false)
        
        const request_option = {
            method: 'POST',
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify({name:'innercard_edit',ind_val_parent:editid.parent,ind_val_child:editid.child,data:editdata}),
            redirect: 'follow'
        }

        await fetch('http://192.168.1.14:5550/expense',request_option)
        .then(response => response.json())
        .then(result => {setexpense(result)})
        .catch(error => console.log('error', error));
        
    }

    let ind_top = 0
    const open_close = (index) => {
        setaccordion({ ...accordion, [index]: !accordion[index]});
        ind_top += 1;
    }

    return(
        <View style={styles.container}>
            {/* {console.log(expense[Index])} */}
            {/* adding value in category */}
            
            <Modal animationIn='slideInUp'  onBackdropPress={()=> setmodal(false)} onSwipeComplete={() => setmodal(false)}
            swipeDirection='down' onBackButtonPress={() => setmodal(false)} isVisible={modal}>
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                    <View style={{backgroundColor:'#DEDEDE',height:'40%',width:'80%',alignItems:'center',justifyContent:'center',rowGap:10,flexBasis:260,borderWidth:2,borderColor:'orange'}}>
                        <Text style={{fontSize:21,fontWeight:600}}>TO ADD</Text>
                        <TextInput style={styles.inputfield} placeholder='Enter Name'  onChangeText={(e)=>validate_name(e)}/>
                        <View style={[styles.inputfield,{flexDirection:"row"}]}>
                            <Text style={{marginTop:9,marginRight:5,fontStyle:'italic',fontWeight:500,fontSize:20}}>₹</Text>
                            <TextInput  placeholder='Enter Amount' keyboardType='numeric' onChangeText={(e)=>validate_amount(e)}/>
                        </View>
                        {message?
                            <Text style={{color:'red',marginTop:-6}}>{message}</Text> : <></>
                        }
                        {console.log(val.amount,val.name)}
                        {val.amount != '' && val.name != '' ?
                        <TouchableOpacity style={styles.modbtn} onPress={()=> {setmodal(false);set_vlaue_inner_card()}}><Text>Add</Text></TouchableOpacity>:
                        <TouchableOpacity style={styles.modbtn} onPress={()=>ToastAndroid.show('Enter values', ToastAndroid.SHORT)}><Text>Add</Text></TouchableOpacity>
                        }
                    </View>
               </View>  
            </Modal>
            {/* modal for editing */}
            <Modal animationIn='slideInUp'  onBackdropPress={()=> {seteditmodal(false);seteditmessage('')}} onSwipeComplete={() => {seteditmodal(false);seteditmessage('')}}
            swipeDirection='down' onBackButtonPress={() => {seteditmodal(false);seteditmessage('')}} isVisible={editmodal}>
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                    <View style={{backgroundColor:'#DEDEDE',height:'40%',width:'80%',alignItems:'center',justifyContent:'center',rowGap:10,flexBasis:260,borderWidth:2,borderColor:'orange'}}>
                        <Text style={{fontSize:21,fontWeight:600}}>TO EDIT</Text>
                        <TextInput style={styles.inputfield} placeholder='Enter Name' value={editdata.name} onChangeText={(e)=>validate_edit_name(e)}/>
                        <View style={[styles.inputfield,{flexDirection:"row"}]}>
                            <Text style={{marginTop:9,marginRight:5,fontStyle:'italic',fontWeight:500,fontSize:20}}>₹</Text>
                            <TextInput  placeholder='Enter Amount' keyboardType='numeric' value={editdata.amount} onChangeText={(e)=>validate_edit_amount(e)}/>
                        </View>
                        {editmessage?
                            <Text style={{color:'red',marginTop:-6}}>{editmessage}</Text> : <></>
                        }
                        {editdata.amount && editdata.name ?
                        <TouchableOpacity style={styles.modbtn} onPress={()=> set_edit_value_inner_card()}><Text>Update</Text></TouchableOpacity>:
                        <TouchableOpacity style={styles.modbtn} onPress={()=>ToastAndroid.show('Enter values', ToastAndroid.SHORT)}><Text>Update</Text></TouchableOpacity>
                        }
                    </View>
               </View>  
            </Modal>
            {/* add button parent */}
            <TouchableOpacity onPress={add} style={styles.btn}><Text>Add</Text></TouchableOpacity>
            <View style={styles.cardcontainer}>
                <View style={{marginTop:10,marginBottom:10,elevation:10}}>
                    <Text style={{fontWeight:500,fontSize:25}}>Expenses</Text>
                </View>
                {/* parent card view */}

                <ScrollView style={{width:'93%',flex:1}} showsVerticalScrollIndicator={false}>
                    {expense.map((ele,Index)=>{
                        return(
                            // dinomination cards
                            <View key={Index} >
                                {/* card header */}
                                <TouchableOpacity onPress={()=> open_close(Index)} style={styles.cardheader} >
                                    <View style={{marginLeft:13,alignItems:'center'}}>
                                        {accordion[Index]?
                                        <Image source={require('./assets/up.png')} style={{height:30,width:30,transform: [{ rotate: '180deg'}]}}></Image>:
                                        <Image source={require('./assets/down.png')} style={{height:30,width:30}}></Image>
                                        }
                                    </View>
                                    <Text style={{marginLeft:13,fontWeight:500,fontSize:16.5}}>{Object.keys(ele)[1]} : </Text>
                                    <View style={{flexDirection:'row-reverse',flex:1,alignItems:'center'}}>
                                        <TouchableOpacity style={{marginRight:20}} onPress={()=> dele(Index)} >
                                            <Icon name="trash" size={24} color="red" />
                                        </TouchableOpacity>
                                        <Text style={{marginRight:20,fontWeight:500,color:'green',fontSize:16.5}}>{ele.Total}</Text>
                                        <Text style={{fontWeight:500,fontSize:16.5,}}>₹ </Text>
                                    </View>
                                </TouchableOpacity>
                                 
                                {/* to view the drop down */}
                                {accordion[Index]?
                                    <View style={{ height: 170,borderWidth:0.2,backgroundColor:'darkgrey',marginBottom:6,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                                        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:25}}>
                                        {expense[Index].category[0]?
                                        expense[Index].category.map((ele,index)=>{
                                                return(
                                                    <View style={{alignItems:'center',marginTop:3,marginBottom:2}} key={index}>
                                                         <View style={styles.innercard}>
                                                            <View style={{marginLeft:15,flexDirection:'row'}}>
                                                                <Text style={{fontSize:14,fontWeight:600}}>{ele.name}  :  ₹ </Text>
                                                                <Text style={{fontSize:14,fontWeight:600,color:'green'}}>{ele.amount} </Text>
                                                            </View>
                                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                                <TouchableOpacity onPress={edit_inner_card.bind(this,ele,index,Index)} style={{marginRight:10,marginTop:1.9}}>
                                                                    <Icon name="edit" size={24} color="#009900" />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={()=>dele_inner_card(index,Index)} style={{marginRight:10}}>
                                                                    <Icon name="trash" size={24} color="red" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>                     
                                                    </View> 
                                                   
                                                );
                                            })
                                         :
                                         <View style={{alignItems:'center',justifyContent:'center',marginTop:40}}><Text style={{fontWeight:200,fontSize:20,fontStyle:'italic'}}>No Data</Text></View>
                                        }               
                                        </ScrollView>
                                        <TouchableOpacity onPress={()=>innercard_add(Index)} style={styles.addbtn}>
                                            <Text style={{fontSize:28}}>+</Text>
                                        </TouchableOpacity> 
                                    </View> :
                                    <></>
                                }
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:Platform.OS == 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: 'orange',
      alignItems: 'center',
      //elevation:15,
      justifyContent: 'center',
      //flexDirection:'column',
    },
    btn:{
        backgroundColor:'white',
        width:'95%',
        height:'7%',
        borderRadius:10,
        elevation:9,
        alignItems:'center',
        justifyContent:'center',
    },
    cardcontainer:{
        flex:0.97,
        backgroundColor:'#DEDEDE',
        alignItems:'center',
        width:'95%',
        marginTop:14,
        borderRadius:8,
        elevation:9,
    },
    cardheader:{
        backgroundColor:'white',
        flexDirection:'row',
        elevation:2.5,
        marginBottom:5.5,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
        height:50,
        //width:'100%',
        alignItems:'center',
    },
    innercard:{
        flexDirection:'row',
        alignItems:'center',
        //justifyContent:'center',
        width:'95%',
        backgroundColor:'white',
        elevation:10,
        borderRadius:3,
        height:45,
        flex:1,
        justifyContent:'space-between',
        //marginBottom:3,
        //marginBottom:2.5,
    },
    addbtn:{
        position:'absolute',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        left:130,
        top:120,
        width:45,
        height:45,
        borderRadius:40,
        elevation:10,
        borderWidth:.1,
        borderColor:'grey'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        alignItems:'center',
        justifyContent:'center',
        width:'80%',
        height:'40%',
        padding: 35,
        alignItems: 'center',
        elevation: 9,
    },
    modbtn:{
       backgroundColor:'orange',
       width:'40%',
       height:'15%',
       alignItems:'center',
       justifyContent:'center',
       elevation:3,
    },
    inputfield:{
        width:200,
        height:50,
        backgroundColor:'white',
        marginBottom:9,
        fontSize:15,
        fontStyle:'italic',
        //color:'red',
        paddingLeft:20,
        borderRadius:30,
        borderColor:'orange',
        borderWidth:2,
        //marginTop:10,
    },
  });